//= core/rule
//= core/ruleset

function geofilter(url, opts) {
    var rules = [],
        // split the url on the 
        parts = (url || '').split(/\//);

    return new RuleSet(rules);
}

// patch the filter rule and ruleset classes into geofilter
geofilter.Rule = Rule;
geofilter.RuleSet = RuleSet;