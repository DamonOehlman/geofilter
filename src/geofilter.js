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