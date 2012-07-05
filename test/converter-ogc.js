var mockrules = require('./helpers/mockrules'),
    comparator = require('./helpers/comparator');
    

describe('OGC filter converter tests', function() {
    it('should be able to convert a single like statement', comparator({
        rules:      [mockrules.likeSand], 
        converter:  'ogc', 
        targetFile: 'ogc/likeSand.xml'
    }));
    
    it('should be able to convert a single like (case sensitive) statement', comparator({
        rules:      [mockrules.likeSandNoCase], 
        converter:  'ogc', 
        targetFile: 'ogc/likeSandNoCase.xml'
    }));
    
    it('should be able to convert a single gt statement', comparator({
        rules:      [mockrules.heavierThan20],
        converter:  'ogc',
        targetFile: 'ogc/heavierThan20.xml' 
    }));
    
    it('should be able to combine two rules using with an ogc:And statement', comparator({
        rules:      [mockrules.heavierThan20, mockrules.likeSand],
        converter:  'ogc',
        targetFile: 'ogc/sandyAndHeavy.xml'
    }));
    
    it('should be able to generate a BBOX rule', comparator({
        rules:      [mockrules.inQLD],
        converter:  'ogc',
        targetFile: 'ogc/inQLD.xml'
    }));
});