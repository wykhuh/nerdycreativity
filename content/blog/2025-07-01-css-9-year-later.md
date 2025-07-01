---
title: CSS Nine Years Later
date: 2025-07-01
tags:
  - coding
---

I updated the styles on a [site](https://github.com/wykhuh/shiffman-p5-tutorials) that I hadn't updated since October 2015, over nine years ago.

The old code had floats to create two column layout.

```css
#content {
  float: left;
  width: 600px;
}

#menu {
  margin-left: 620px;
}
```

The new code uses CSS grid.

```css
#wrapper {
  display: grid;
  grid-template-columns: 6fr 4fr;
}
```

Despite being 9 years old, the javascript and css still worked. That's the advantage of javascript and css - backwards compatibility.

The site is written in javascript and css. I didn't have to deal with complicated build processes and updating libraries to start and update the site. The 3rd party javascript libraries and css were in the project directories. Sometimes using a simple solution pays off in the long term.
