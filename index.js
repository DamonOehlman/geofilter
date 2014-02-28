/* jshint node: true */
'use strict';

var Rule = require('./rule');

/**
  # geofilter

  Geofilter is a geospatial filter language that is designed to work well
  with web applications.  It's primary purpose is to help with creating
  readable, cacheable urls for geospatial searches but also uses an
  [internal JSON representation](https://github.com/DamonOehlman/geofilter/wiki/Internal-Representation)
  that can be easily translated to other spatial filter types
  (e.g. [OGC Filter Format](http://www.opengeospatial.org/standards/filter)).

  ## General Syntax

  The general syntax of a geofilter is a forward-slash (`/`) delimited filter
  string.  The use of the forward slash means that you get readable urls for
  free.

  For the most part, geofilter expressions are defined across two sections,
  with the first section specifying the type of filter to invoke and the
  second being comma-delimited arguments that will be passed to the filter:

  ```
  http://testgeo.org/search/FILTERTYPE/FILTERARGS
  ```

  When multiple filters are provided, these filters are combined only the
  __intersection__ of two filters is returned with the results.  For instance,
  the following request would return the results of filter
  `TYPE1(ARGS1) AND TYPE2(ARGS2)`.

  ```
  http://testgeo.org/search/TYPE1/ARGS1/TYPE2/ARGS2
  ```

  At this stage, no provision for an OR operator is being considered.

  ## Filter Types

  The following filter types are being investigated / implemented for the
  initial release of the GeoFilter library.  While some of the filter types
  do not include a `/P:PROPNAME` specifier (geospatial queries usually),
  others will usually require this syntax.

  The geofilter initialization step, does include provision for configuring
  the default properties that will be targeted for both spatial and also a
  non-spatial filter operation.  The defaults used are `the_geom` for a
  spatial operation, and `name` for a non-spatial operation.

  In all of the filter operations specified below, you can specify a leading
  `/P:PROPNAME` url segment to override the default targeted fields.

  ### BBOX

  A bounding box filter.

  ```
  /BBOX/MINLAT,MINLON,MAXLAT,MAXLON
  ```

  The four arguments are all numeric floating point values, and correspond to
  the latitude and longitude of the bounding box sw-corner and the latitude
  and longitude of the bounding box ne-corner respectively.

  ### DWITHIN

  A distance within filter.  The distance within filter returns all items
  that fall within the specified geometry.  The `BUFFERDIST` arg is used to
  specify the buffer that should be applied to the geometry search.
  A 0 buffer indicates the exact geometry will be used, a positive buffer
  indicates the geometry will be expanded, and a negative buffer indicates
  the buffer will be shrunk (where possible).

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

  The Geofilter format is __not__ designed to provide constructs for
  describing complicated filter operations, and has not provision for
  providing __OR__ rule (all filters are combined with an __AND__ condition).
**/

function Geofilter(rules, opts) {
  if (! (this instanceof Geofilter)) {
    return new Geofilter(rules, opts);
  }

  // initialise the rules
  this.rules = [].concat(rules || []).map(function(rule) {
    return rule instanceof Rule ? rule : new Rule(rule);
  });
}

RuleSet.prototype.to = function(format, opts) {
    // get the converter
    var converter = geofilter._converters[format];
    
    // if we don't have the converter, but do have the ability to require the converter do that now
    if ((! converter) && typeof require == 'function') {
        converter = geofilter._converters[format] = require('./' + format);
    }
    
    // if we definitely don't have a convert (after a require attempt) then raise an error
    if (! converter) {
        throw new Error('Unable to find geofilter converter for type "' + format + '"');
    }
    
    // return the results from the converter
    return converter(this.rules, opts);
};

RuleSet.prototype.toJSON = function() {
    return this.rules;
};
//= core/rule
//= core/ruleset

function geofilter(url, opts) {
    var rules = [],
        // split the url on the 
        parts = (url || '').split(/\//);

    return new RuleSet(rules);
}

// initialise the "hidden" converters property
geofilter._converters = {};

// handle converter registration
geofilter.registerConverter = function(type, handler) {
    return (geofilter._converters[type] = handler);
};

// patch the filter rule and ruleset classes into geofilter
geofilter.Rule = Rule;
geofilter.RuleSet = RuleSet;