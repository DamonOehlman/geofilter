var mockrules = require('./helpers/mockrules'),
    comparator = require('./helpers/comparator');
    

describe('OGC filter converter tests', function() {
    it('should be able to convert a single like statement', comparator({
        rules:      [mockrules.likeSand], 
        converter:  'ogc', 
        targetFile: 'ogc/likeSand.xml'
    }));
    
    it('should be able to convert a single gt statement', comparator({
        rules:      [mockrules.heavierThan20],
        converter:  'ogc',
        targetFile: 'ogc/heavierThan20.xml' 
    }));
});