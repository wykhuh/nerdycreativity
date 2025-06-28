---
title: Salton Sea Changing Area
tags:
  - GIS

image: /images/gis/salton-sea-gee.jpg
imageAlt: "Map of Salton Sea"
showProjectHero: false
teckStack:
  - "Google Earth Engine"
  - JavaScript
siteUrl: ""
repoUrl: https://github.com/wykhuh/salton-sea-remote-sensing
projectType: projects_gis_pcc
---

## Project Details

This project examines the shrinkage of the Salton Sea. The project looks at Landsat data from 1984 to 2024 at 5 year intervals using Google Earth Engine.

I'm a software developer. Knowing how to code improved my analysis. I was able to use my software skills to write functions to download the Landsat data, classify the images into land and water, and calculate the area of the lake. By writing custom functions, I was able to process 9 set of images by adding one line of code per year. If I had to write separate code for each year, I would have only examined data from two years.

{% set pdfScale = '.4' %}
{% set pdfUrl = '/pdfs/salton_sea_presentation.pdf' %}
{% include "pdfviewer.njk" %}

## Data Sources

- 1984 to 2024 Landsat data using Google Earth Engine

## Foothills College Course

GIST 58 Remote Sensing & Digital Image Processing
