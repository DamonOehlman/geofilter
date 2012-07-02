var fs = require('fs'),
    path = require('path'),
    geofilter = module.exports = require('./pkg/cjs/geofilter'),
    extraModules = fs.readdirSync(path.resolve(__dirname, 'pkg', 'cjs'));
    
function not(filename) {
    return function(file) {
        return file.toLowerCase() !== filename.toLowerCase();
    };
}

// patch in the additional modules
extraModules.filter(not('geofilter.js')).forEach(function(file) {
    require('./pkg/cjs/' + file);
});