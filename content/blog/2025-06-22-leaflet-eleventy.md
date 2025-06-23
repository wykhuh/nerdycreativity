---
title: Adding Leaflet maps to Eleventy
date: 2025-06-22
tags:
  - coding
---

I wanted to find out how to add Leaflet maps to Eleventy, and I came across this post from [Mike Neumegen at cloudcannon](https://cloudcannon.com/tutorials/eleventy-beginner-tutorial/eleventy-global-data-files/). The code is kinda outdated, so I had to update some things.

First you create in `locations.json` file in the `_data` folder. `locations.json` is an array of locations

```json
[
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
```

Then you add a file called `map.njk` in the `_includes` folder. `map.njk` has CDN links for Leaflet, html markup for the map, and the javacript code to create a Leaflet map.

```html
{% raw %}
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""
/>
<!-- Make sure you put this AFTER Leaflet's CSS -->
<script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  crossorigin=""
></script>

<div id="map"></div>

<style>
  #map {
    height: 300px;
  }
</style>

<script>
  // https://mozilla.github.io/nunjucks/templating.html#builtin-filters
  // https://github.com/11ty/eleventy/issues/1158

  // dump(2) will JSON.stringify markers object with 2 spaces.
  // safe will ensure that the data is not escaped.
  let markers = {{ markers | dump(2) | safe }}

  // create map
  const map = L.map('map');

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
      .addTo(map);

  // add location markers to map
  let bounds = [];
  for (let i = 0; i < markers.length; i++ ) {
      const marker = L.marker([markers[i].latitude, markers[i].longitude]).addTo(map);
      marker.bindPopup(markers[i].name);
      bounds.push([markers[i].latitude, markers[i].longitude]);
  }

  // adjust the map to show all location markers
  map.fitBounds(bounds);
</script>
{% endraw %}
```

Then in the file you want to add the map, include `map.njk` and pass in the markers data and the height of the map.

```js
{% raw %}
{% set markers = locations %}
{% set mapHeight = '400px' %}
{% include "map.njk" %}
{% endraw %}
```

Here's the map with markers.

{% set markers = locations %}
{% set mapHeight = '400px' %}
{% include "map.njk" %}
