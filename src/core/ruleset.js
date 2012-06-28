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

RuleSet.prototype.toJSON = function() {
    return this.rules;
};