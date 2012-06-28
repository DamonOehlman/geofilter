function RuleSet(rules, opts) {
    // initialise the rules
    this.rules = [].concat(rules || []);
    
    // ensure the rules are properly configured as rules
    for (var ii = 0; ii < this.rules.length; ii++) {
        if (! (this.rules[ii] instanceof Rule)) {
            this.rules[ii] = new Rule(this.rules[ii]);
        }
    }
    
    // ensure we have opts
    opts = opts || [];
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