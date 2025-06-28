let pdfWorkerUrl = '/nerdycreativity/assets/lib/pdfjs/generic-legacy/build/pdf.worker.mjs'

  window.PdfViewer.init('/nerdycreativity/assets/pdfs/pcc-portfolio/inat_la_river.pdf', 1 , pdfWorkerUrl)
/*
https://mozilla.github.io/nunjucks/templating.html#builtin-filters
https://github.com/11ty/eleventy/issues/1158
*/

let markers = [
  {
    "name": "Kentucky Ridge State Forest",
    "latitude": "36.736700",
    "longitude": "-83.762480"
  },
  {
    "name": "Amity Park",
    "latitude": "35.932640",
    "longitude": "-82.006000"
  },
  {
    "name": "Mill Creek Park",
    "latitude": "40.030819",
    "longitude": "-122.115387"
  },
  {
    "name": "Willamette National Forest",
    "latitude": "44.058990",
    "longitude": "-122.484970"
  },
  {
    "name": "The Mound",
    "latitude": "32.490819",
    "longitude": "-80.320408"
  }
]

const map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
    .addTo(map);

let bounds = [];
for (let i = 0; i < markers.length; i++ ) {
    const marker = L.marker([markers[i].latitude, markers[i].longitude]).addTo(map);
    marker.bindPopup(markers[i].name);
    bounds.push([markers[i].latitude, markers[i].longitude]);
}

map.fitBounds(bounds);