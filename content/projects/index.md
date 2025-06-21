---
layout: layouts/base.njk
eleventyNavigation:
  key: Projects
  order: 4
---



# Projects

I'm a nerd who like to make stuff. Here's some of the stuff that I've made.

## GIS

<div class="project-list">
  {% for project in collections.projects %}
    {% if project.data.projectType == 'GIS' %}
      {% include "layouts/project-card.njk" %}
    {% endif %}
  {% endfor %}
</div>

## Coding

<div class="project-list">
  {% for project in collections.projects %}
    {% if project.data.projectType == 'coding' %}
      {% include "layouts/project-card.njk" %}
    {% endif %}
  {% endfor %}
</div>

## Coding - Work

<div class="project-list">
  {% for project in collections.projects %}
    {% if project.data.projectType == 'coding-work' %}
      {% include "layouts/project-card.njk" %}
    {% endif %}
  {% endfor %}
</div>


## Paper Engineering

<div class="project-list">
  {% for project in collections.projects %}
    {% if project.data.projectType == 'paper' %}
      {% include "layouts/project-card.njk" %}
    {% endif %}
  {% endfor %}
</div>
