var geofilter = require('../../'),
    expect = require('expect.js'),
    fs = require('fs'),
    path = require('path'),
    comparisonsPath = path.resolve(__dirname, '..', 'comparisons'),
    reLineBreaks = /[\n\r]/g,
    reStripChars = /(^\s+|\s+$)/mg;

module.exports = function(opts) {
    var ruleset, output;
    
    // initialise the options
    opts = opts || {};
    
    // ensure we have rules
    opts.rules = opts.rules || [];
    
    // create the ruleset
    ruleset = new geofilter.RuleSet(opts.rules);
    
    return function(done) {
        // load the comparison file
        fs.readFile(path.join(comparisonsPath, opts.targetFile || ''), 'utf8', function(err, expectedOutput) {
            // if we have received an error then abort
            if (err) return done(err);
            
            // strip line breaks from the expected output
            expectedOutput = expectedOutput.replace(reStripChars, '').replace(reLineBreaks, '');
            
            // expect that we have a ruleset
            expect(ruleset).to.be.ok();
            expect(ruleset.rules.length).to.equal(opts.rules.length);
            
            // create the converted output
            output = ruleset.to(opts.converter);
            
            // expect the output to match the expected output
            expect(output).to.equal(expectedOutput);
            
            // flag the process as done
            done();
        });
    };
};