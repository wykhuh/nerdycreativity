---
title: Dancing Digital/No Boundaries Archive Project
tags:
  - open data
  - Wikidata
date: 2022-01-01

image: /images/dancing-digital.png
imageAlt: screen shot of Dancing Digital demo site
teckStack:
  - Python
  - Pandas
  - Wikibase
  - Svelte Kit
  - Vis.js
  - Github Pages
  - Wikibase Cloud
siteUrl:
  [
    {
      url: https://collectiveaccess.github.io/Wikidata-Integration-UI/,
      text: Dancing Digital network graphs,
    },
    {
      url: https://dancing-digital.wikibase.cloud/wiki/Main_Page,
      text: Dancing Digital wikibase,
    },
  ]
repoUrl: https://github.com/collectiveaccess/Wikidata-Integration-UI/tree/main
projectType: coding-wig
---

## Project Details

Dancing Digital is a project lead by Rebecca Salzer (University of Alabama) to create interconnected, online dance resources. No Boundaries is a dance project by Gesel Mason (University of Texas) that consists of a collection of dance solos by African American choreographers that span over 70 years. They hired Whirl-i-Gig to create an online archive for No Boundaries using CollectiveAccess, an open source collection management software built by Whirl-i-Gig. My responsibility for the project was to develop a workflow to export/import data between CollectiveAccess and Wikidata.

I created Python scripts to export data from No Boundaries, Brooklyn Academy of Music, and Jacob’s Pillow archives, and import the data into a Wikibase instance named Dancing Digital Commons (DDC). DDC is hosted for free using Wikibase Cloud. In order to fully explore data in Wikibase, people need to learn SPARQL language. In order to make DDC data more accessible, I created a demo web app that would allow people to explore Wikibase data without knowing SPARQL. Users fill in the search form and app will send a SPARQL query to Wikibase. The app shows the search results as network graph and text table.

## Presentations/Publications

- ARLIS North America April 2023: Dancing Digital & The No Boundaries Archive Project - Linked Data for Diversity in Contemporary Dance Archives
- BioDigiCon 2022: Integrating Wikidata into collection management software
