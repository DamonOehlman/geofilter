define('geofilter', [], function() {
  function Rule(type, args) {
      // check if we have been supplied a complete object in tht type object
      if (typeof type == 'object' && (! (type instanceof String))) {
          // map the parameters of the type to this
          for (var key in type) {
              if (type.hasOwnProperty(key)) {
                  this[key] = type[key];
              }
          }
      }
      else if (typeof type == 'object') {
          this.type = type;
          this.args = args || {};
      }
  }
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
  
  function geofilter(url, opts) {
      var rules = [],
          // split the url on the 
          parts = (url || '').split(/\//);
  
      return new RuleSet(rules);
  }
  
  // patch the filter rule and ruleset classes into geofilter
  geofilter.Rule = Rule;
  geofilter.RuleSet = RuleSet;

  return geofilter;
});