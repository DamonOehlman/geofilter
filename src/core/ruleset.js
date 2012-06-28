function RuleSet(rules, opts) {
    // initialise the rules
    this.rules = rules || [];
    
    // ensure we have opts
    opts = opts || [];
}

RuleSet.prototype.toJSON = function() {
    return this.rules;
};