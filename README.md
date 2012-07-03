# GeoFilter

Geofilter is a simple geospatial filter language that is designed to work well with web applications.  It's primary purpose is to help with creating readable, cacheable urls for geospatial searches but also uses an [internal JSON representation](/DamonOehlman/geofilter/wiki/Internal-Representation) that can be easily translated to other spatial filter types (e.g. [OGC Filter Format](http://www.opengeospatial.org/standards/filter)).

<a href="http://travis-ci.org/#!/DamonOehlman/geofilter"><img src="https://secure.travis-ci.org/DamonOehlman/geofilter.png" alt="Build Status"></a>

## General Syntax

The general syntax of a geofilter is a forward-slash (`/`) delimited filter string.  The use of the forward slash means that you get readable urls for free.  

For the most part, geofilter expressions are defined across two sections, with the first section specifying the type of filter to invoke and the second being comma-delimited arguments that will be passed to the filter:

```
http://testgeo.org/search/FILTERTYPE/FILTERARGS
```

When multiple filters are provided, these filters are combined only the __intersection__ of two filters is returned with the results.  For instance, the following request would return the results of filter `TYPE1(ARGS1) AND TYPE2(ARGS2)`.

```
http://testgeo.org/search/TYPE1/ARGS1/TYPE2/ARGS2
```

At this stage, no provision for an OR operator is being considered.

## Filter Types

The following filter types are being investigated / implemented for the initial release of the GeoFilter library.  While some of the filter types do not include a `/P:PROPNAME` specifier (geospatial queries usually), others will usually require this syntax.

The geofilter initialization step, does include provision for configuring the default properties that will be targeted for both spatial and also a non-spatial filter operation.  The defaults used are `the_geom` for a spatial operation, and `name` for a non-spatial operation.

In all of the filter operations specified below, you can specify a leading `/P:PROPNAME` url segment to override the default targeted fields.

### BBOX

A bounding box filter.

```
/BBOX/MINLAT,MINLON,MAXLAT,MAXLON
```

The four arguments are all numeric floating point values, and correspond to the latitude and longitude of the bounding box sw-corner and the latitude and longitude of the bounding box ne-corner respectively.

### DWITHIN

A distance within filter.  The distance within filter returns all items that fall within the specified geometry.  The `BUFFERDIST` arg is used to specify the buffer that should be applied to the geometry search.  A 0 buffer indicates the exact geometry will be used, a positive buffer indicates the geometry will be expanded, and a negative buffer indicates the buffer will be shrunk (where possible).

```
/DWITHIN/GEOMTYPE,BUFFERDIST,GEOMETRY
```

### EQ - Equals

```
/EQ/VALUE
```

### GT - Greater Than

```
/GT/VALUE
```

### GTE - Greater Than or Equal To

```
/GTE/VALUE
```

### LT - Less Than

```
/LT/VALUE
```

### LTE - Less Than or Equal To

```
/LTE/VALUE
```

## Limitations

The Geofilter format is __not__ designed to provide constructs for describing complicated filter operations, and has not provision for providing __OR__ rule (all filters are combined with an __AND__ condition).