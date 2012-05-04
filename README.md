# GeoFilter

Geofilter is a simple geospatial filter language that is designed to work well with web applications.  It's primary purpose is to help with creating readable, cacheable urls for geospatial searches.

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

The following filter types are being investigated / implemented for the initial release of the GeoFilter library.

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

### PROP

A property comparison filter. This filter allows you to perform arbitrary property comparison operations.  The operation type is specified by the `COMPTYPE` section, and the `VALUE` section contains the value (or values) that will be used in the comparison operation.

```
/PROP/COMPTYPE/VALUE
```

#### Equality

```
/PROP/EQ/VALUE
```

#### Greater Than

```
/PROP/GT/VALUE
```

#### Greater Than or Equal To

```
/PROP/GTE/VALUE
```

#### Less Than

```
/PROP/LT/VALUE
```

#### Less Than or Equal To

```
/PROP/LTE/VALUE
```