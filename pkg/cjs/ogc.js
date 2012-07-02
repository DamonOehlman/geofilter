var geofilter = require('./geofilter'),
    formatter = require('formatter'),
    underscore = require('underscore');


var _ogc_templates = {
  'isLike': '<ogc:PropertyIsLike wildCard="*" singleChar="?" escapeChar="\\\\" matchCase="{{ matchCase }}">{{ inner }}</ogc:PropertyIsLike>',
  'property': '<ogc:PropertyName>{{ property }}</ogc:PropertyName><ogc:Literal>{{ value }}</ogc:Literal>'
};


var builders = {},
    templates = {},
    propertyTags = {
        gt: 'PropertyIsGreaterThan'
    };
    
function makePropertyTag(args, opts) {
    return templates.property(args);
}

/* define the tag builders */

builders.like = function(type, args, opts) {
    // ensure the match case opt is defined
    args.matchCase = args.matchCase || false;
    
    // generate the tag
    return templates.isLike(_.extend({}, args, {
        inner: makePropertyTag(args, opts)
    }));
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

if (typeof ogc != 'undefined') { module.exports = ogc; }