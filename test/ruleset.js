var geofilter = require('../pkg/cjs/geofilter'),
    expect = require('expect.js');

describe('ruleset tests', function() {
    it('should be able to create a ruleset that contains no rules', function() {
        var ruleset = new geofilter.RuleSet();
        
        expect(ruleset.rules.length).to.equal(0);
    });
});