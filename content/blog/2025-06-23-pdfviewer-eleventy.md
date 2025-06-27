---
title: Adding PDF viewer to Eleventy
date: 2025-06-24
tags:
  - coding
---

I wanted to add a PDF viewer to Eleventy.

You can install [PDF.js](https://mozilla.github.io/pdf.js/) from npm. However, this version only works on Firefox and Chrome. To get a version that works on Safari, you need to use the legacy build version.

Clone the PDF.js repo and install dependencies.

```bash
git clone https://github.com/mozilla/pdf.js.git
cd pdf.js
npm install
```

Build the legacy version.

```bash
npx gulp generic-legacy
```

This will generate `pdf.js` and `pdf.worker.js` in the `build/generic-legacy/build/` directory. Copy `pdf.js` and `pdf.worker.js` to `/public/lib/pdfjs/generic-legacy/build`.

Then I put the code to create a viewer in `public/lib/pdfviewer.js`. The code is based on PDF.js [Prev/Next example](https://jsfiddle.net/pdfjs/wagvs9Lf/) and [mobile viewer example](https://github.com/mozilla/pdf.js/tree/master/examples/mobile-viewer).

```js
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
```

I added a template file in `_includes/pdfviewer.njk`. `pdfviewer.njk` calls the `init()` from `pdfviewer.js` with `pdfUrl` argument.

```html
{% raw %}
<style>
  {% include "css/pdfviewer.css" %}
</style>

<section class="pdfviewer">
  <div>
    <button id="prev" type="button" title="previous page">Previous</button>
    <button id="next" type="button" title="next page">Next</button>
    <button id="zoomIn" type="button" title="zoom in">+</button>
    <button id="zoomOut" type="button" title="zoom out">-</button>
    <span
      >Page: <span id="page_num"></span> / <span id="page_count"></span
    ></span>
  </div>

  <canvas id="the-canvas" style="border: 1px solid black;"></canvas>
</section>

<script src="/lib/pdfjs/generic-legacy/build/pdf.mjs" type="module"></script>
<script>
  import { init } from "/pdfviewer.js";
  init("{{pdfUrl}}");
</script>

{% endraw %}
```

Then in the file you want to add the map, include `pdfviewer.njk` and pass in the pdfUrl.

```js
{% raw %}
{% set pdfUrl = '/pdfs/pcc-portfolio/inat_la_river.pdf' %}
{% include "pdfviewer.njk" %}
{% endraw %}
```

{% set pdfUrl = '/pdfs/pcc-portfolio/inat_la_river.pdf' %}
{% include "pdfviewer.njk" %}
