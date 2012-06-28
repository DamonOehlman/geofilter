define('geofilter', [], function() {
  function Rule(type, args) {
      this.type = type;
      this.args = args || {};
  }
  function RuleSet(rules, opts) {
      // initialise the rules
      this.rules = rules || [];
      
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
  
      console.log(parts);
      
      return new RuleSet(rules);
  }
  
  // patch the filter rule and ruleset classes into geofilter
  geofilter.Rule = Rule;
  geofilter.RuleSet = RuleSet;

  return geofilter;
});