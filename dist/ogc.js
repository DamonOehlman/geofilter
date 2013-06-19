/* ~geofilter~
 * 
 * Simple Geospatial filter language designed for readable urls
 * 
 * -meta---
 * version:    0.1.2
 * builddate:  2013-06-19T02:46:52.738Z
 * generator:  interleave@0.5.24
 * 
 * 
 * 
 */ 

// umdjs returnExports pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('./geofilter'), require('formatter'), require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
        define(['./geofilter', 'formatter', 'underscore'], factory);
    } else {
        root['ogc'] = factory(root['./geofilter'], root['formatter'], root['underscore']);
    }
}(this, function (geofilter, formatter, _) {
    
    var _ogc_templates = {
      'bbox': '<ogc:BBOX><ogc:PropertyName>{{ property }}</ogc:PropertyName>{{ envelope }}</ogc:BBOX>',
      'envelope': '<gml:Envelope srs="{{ srs }}"><gml:lowerCorner>{{ min }}</gml:lowerCorner><gml:upperCorner>{{ max }}</gml:upperCorner></gml:Envelope>',
      'isLike': '<ogc:PropertyIsLike wildCard="{{ wildCard }}" singleChar="{{ singleChar }}" escapeChar="{{ escapeChar }}" matchCase="{{ matchCase }}">{{ inner }}</ogc:PropertyIsLike>',
      'property': '<ogc:PropertyName>{{ property }}</ogc:PropertyName><ogc:Literal>{{ value }}</ogc:Literal>'
    };
    
    
    var builders = {},
        templates = {},
        propertyTags = {
            gt: 'PropertyIsGreaterThan'
        };
        
    function makeEnvelope(args, opts) {
        // initialise the default SRS to 4326
        args.srs = args.srs || 'EPSG:4326';
        
        return templates.envelope(args);
    }
        
    function makePropertyTag(args, opts) {
        return templates.property(args);
    }
    
    /* define the tag builders */
    
    builders.bbox = function(type, args, opts) {
        return templates.bbox(_.extend({}, args, {
            envelope: makeEnvelope(args, opts)
        }));
    };
    
    builders.like = function(type, args, opts) {
        // initialise default arg value
        args.wildCard = args.wildCard || '*';
        args.singleChar = args.singleChar || '?';
        args.escapeChar = args.escapeChar || '\\\\';
        
        // initialise the match case option, default is true in the OGC spec so we will respect that
        args.matchCase = typeof args.matchCase == 'undefined' || args.matchCase === true;
        
        // generate the tag
        return templates.isLike(_.extend({}, args, {
            inner: makePropertyTag(args, opts)
        }));
    };
    
    builders.inSet = function (type, args, opts, req) {
    
        // initialise default arg value
        args.wildCard = args.wildCard || '*';
        args.singleChar = args.singleChar || '?';
        args.escapeChar = args.escapeChar || '\\\\';
        args.operation = args.operation || 'and';
    
        var output = "";
    
        var property = args.property;
        var values = args.value.split(',');
    
        values.forEach(function (value) {
            args.value = args.wildCard + value + args.wildCard;
            output += templates.isLike(_.extend({}, args, {
                inner: makePropertyTag(args, opts, req)
            }));
        });
    
        return args.operation == 'and' ? '<ogc:And>' + output + '</ogc:And>' : '<ogc:Or>' + output + '</ogc:Or>';
    };
    
    /* register the converter */
    
    geofilter.registerConverter('ogc', function(rules, opts) {
        var output = '';
        
        // initialise opts
        opts = opts || {};
        
        // default the srs to EPSG:4326 (lat/lon)
        opts.srs = opts.srs || 'EPSG:4326';
        
        // iterate through the rules and generate the output
        rules.forEach(function(rule) {
            var type = (rule || {}).type,
                builder = builders[type],
                tagName = propertyTags[type];
            
            // if we have a valid builder, then process
            if (typeof builder == 'function') {
                // run the builder
                output += builder(rule.type, rule.args || {}, opts);
            }
            else if (tagName) {
                output += '<ogc:' + tagName + '>' + makePropertyTag(rule.args || {}, opts) + '</ogc:' + tagName + '>';
            }
            else {
                throw new Error('Unable to build OGC filter for rule type "' + (rule || {}).type + '"');
            }
        });
        
        // if the number of rules is greater than 1, combine in an And clause
        if (rules.length > 1) {
            output = '<ogc:And>' + output + '</ogc:And>';
        }
        
        return '<ogc:Filter>' + output + '</ogc:Filter>';
    });
    
    // initialise the templates
    for (var key in _ogc_templates) {
        templates[key] = formatter(_ogc_templates[key]);
    }
    
    return typeof ogc != 'undefined' ? ogc : undefined;
}));