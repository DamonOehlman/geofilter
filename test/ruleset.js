var geofilter = require('../'),
    expect = require('expect.js'),
    mockrules = require('./helpers/mockrules');
    
    
describe('ruleset tests', function() {
    it('should be able to create a ruleset that contains no rules', function() {
        var ruleset = new geofilter.RuleSet();
        
        expect(ruleset.rules.length).to.equal(0);
    });
    
    it('should be able to create a ruleset with a single rule (even if not specified as an array)', function() {
        var rule = new geofilter.Rule(mockrules.likeSand),
            ruleset = new geofilter.RuleSet(rule);
            
        expect(ruleset.rules.length).to.equal(1);
        expect(ruleset.rules[0] instanceof geofilter.Rule).to.be.ok();
        expect(ruleset.rules[0].type).to.equal('like');
    });
    
    it('should be able to create a ruleset specifying a rule (not yet configured as a geofilter.Rule)', function() {
        var ruleset = new geofilter.RuleSet(mockrules.likeSand);

        expect(ruleset.rules.length).to.equal(1);
        expect(ruleset.rules[0] instanceof geofilter.Rule).to.be.ok();
        expect(ruleset.rules[0].type).to.equal('like');
    });
    
    it('should be able to initialize specifying multiple rules', function() {
        var ruleset = new geofilter.RuleSet([mockrules.likeSand, mockrules.heavierThan20]);
        
        expect(ruleset.rules.length).to.equal(2);
        expect(ruleset.rules[0].type).to.equal('like');
        expect(ruleset.rules[1].type).to.equal('gt');
    });
});