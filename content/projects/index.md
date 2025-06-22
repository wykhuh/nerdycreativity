---
layout: layouts/base.njk
eleventyNavigation:
  key: Projects
  order: 4
---

# Projects

I'm a nerd who like to make stuff. Here's some of the stuff that I've made.

## Coding

Projects I worked on as a software engineer for fun and at work.

<div class="project-list">
  {% for project in collections.projects_coding | sortTitleAlphabetically %}{% include "project-card.njk" %}{% endfor %}
</div>

## GIS

Projects I worked on as a student at Pasadena City College.

<div class="project-list">
  {% for project in collections.projects_gis | sortTitleAlphabetically %}{% include "project-card.njk" %}{% endfor %}
</div>

## Paper Engineering - Structural Graphics

Projects I worked on as a paper engineer at Structural Graphics.

<div class="project-list">
  {% for project in collections.projects_paper_sg | sortTitleAlphabetically %}{% include "project-card.njk" %}{% endfor %}
</div>
