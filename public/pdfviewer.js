/*
The code for pdfviewer.js based on PDF.js examples

https://jsfiddle.net/pdfjs/wagvs9Lf/
https://github.com/mozilla/pdf.js/tree/master/examples/mobile-viewer
*/

// set workerSrc property
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "/lib/pdfjs/generic-legacy/build/pdf.worker.mjs";

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1;
let canvas = document.getElementById("the-canvas");
let ctx = canvas.getContext("2d");
const DEFAULT_SCALE_DELTA = 1.1;
const MIN_SCALE = 0.25;
const MAX_SCALE = 10.0;

/**
 * Get page info from document, resize canvas accordingly, and render page.
 */
function renderPage(num) {
  if (canvas == null) return;

  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function (page) {
    var viewport = page.getViewport({ scale: scale });
    // Support HiDPI-screens.
    var outputScale = window.devicePixelRatio || 1;

    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = Math.floor(viewport.width) + "px";
    canvas.style.height = Math.floor(viewport.height) + "px";

    var transform =
      outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      transform: transform,
      viewport: viewport,
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function () {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById("page_num").textContent = num;
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finished. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}

/**
 * Zoom in
 */
function pdfViewZoomIn() {
  let newScale = scale;
  newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
  newScale = Math.ceil(newScale * 10) / 10;
  newScale = Math.min(MAX_SCALE, newScale);
  scale = newScale;

  queueRenderPage(pageNum);
}

/**
 * Zoom out
 */
function pdfViewZoomOut() {
  let newScale = scale;
  newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
  newScale = Math.floor(newScale * 10) / 10;
  newScale = Math.max(MIN_SCALE, newScale);
  scale = newScale;

  queueRenderPage(pageNum);
}

/**
 * Setup event handlers
 */
function setupEventHandlers() {
  let prevEl = document.getElementById("prev");
  if (prevEl) prevEl.addEventListener("click", onPrevPage);

  let nextEl = document.getElementById("next");
  if (nextEl) nextEl.addEventListener("click", onNextPage);

  let zoomInEl = document.getElementById("zoomIn");
  if (zoomInEl) zoomInEl.addEventListener("click", pdfViewZoomIn);

  let zoomOutEl = document.getElementById("zoomOut");
  if (zoomOutEl) zoomOutEl.addEventListener("click", pdfViewZoomOut);
}

export async function init(url) {
  setupEventHandlers();

  // download pdf
  var loadingTask = pdfjsLib.getDocument(url);
  pdfDoc = await loadingTask.promise;

  // set page count
  let countEl = document.getElementById("page_count");
  if (countEl) countEl.textContent = pdfDoc.numPages;

  // render first page
  renderPage(pageNum);
}
