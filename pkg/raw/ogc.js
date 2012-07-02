// req: ./geofilter, formatter, underscore

var _ogc_templates = {
  'isLike': '<ogc:PropertyIsLike wildCard="*" singleChar="?" escapeChar="\\\\" matchCase="{{ matchCase }}">{{ inner }}</ogc:PropertyIsLike>',
  'property': '<ogc:PropertyName>{{ property }}</ogc:PropertyName><ogc:Literal>{{ value }}</ogc:Literal>'
};


var builders = {},
    templates = {};
    
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
        var builder = builders[(rule || {}).type];
        
        // if we have a valid builder, then process
        if (typeof builder == 'function') {
            // run the builder
            output += builder(rule.type, rule.args || {}, opts);
        }
    });
    
    return output;
});

// initialise the templates
for (var key in _ogc_templates) {
    templates[key] = formatter(_ogc_templates[key]);
}