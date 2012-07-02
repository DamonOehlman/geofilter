var mockrules = require('./helpers/mockrules'),
    comparator = require('./helpers/comparator');
    

describe('OGC filter converter tests', function() {
    it('should be able to convert a single like statement', comparator({
        rules:      [mockrules.likeSand], 
        converter:  'ogc', 
        targetFile: 'ogc/likeSand.xml'
    }));
});