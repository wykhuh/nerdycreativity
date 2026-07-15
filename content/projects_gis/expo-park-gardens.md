---
title: Biodiversity of the Gardens at Exposition Park
tags:
  - GIS

image: /images/gis/expo-park-gardens.jpg
imageAlt: Map comparing iNaturalist observations at Exposition Parks gardens
teckStack:
  - R
  - Quarto
  - tidyverse
  - ggplot
  - sf
  - basemaps
siteUrl: [{ url: https://wykhuh.github.io/expo-park-gardens/, text: link }]
repoUrl: https://github.com/wykhuh/expo-park-gardens
projectType: projects_gis
---

## Project Details

One of the arguments that native plant advocates have for planting native plants is that native plants attract a larger diversity of native wildlife. Exposition Park has two main gardens: Natural History Museum of Los Angeles County Nature Garden, which is full of native plants, and Rose Garden, which is full of roses and lawn grass. The NHM Nature Gardens and the Rose Garden could be a good test case to compare the effect of native plants on biodiversity.

Despite the Rose Garden being a much bigger garden, NHM has 14,397 observations, while the Rose Garden has 338. NHM has 42 times more observations than the Rose Garden!

I assumed there would be more observations at the NHM than Rose Garden because the museum has an active community science program and education department. But I did not expect the difference to be 14K to 400. In theory, community science is supposed to lower the barrier of entry into science. But looking at the Exposition Park gardens data, and the iNaturalist data at LA County colleges and universities, it is a reminder that barriers to science still exist within community science.

## Data Sources

I used iNaturalist and eBird (Cornell Lab of Ornithology) data from 2014 to 2023 at Natural History Museum of Los Angeles County and Rose Garden that I downloaded from GBIF.org.
