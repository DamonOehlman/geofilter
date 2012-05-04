# GeoFilter

Geofilter is a simple geospatial filter language that is designed to work well with web applications.  It's primary purpose is to help with creating readable, cacheable urls for geospatial searches.

## General Syntax

The general syntax of a geofilter is a forward-slash (`/`) delimited filter string.  The use of the forward slash means that you get readable urls for free.  For the most part, geofilter expressions are defined across two sections, e.g.

http://testgeo.org/search/`FILTERTYPE`/`FILTERARGS`


