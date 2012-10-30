var fs = require('fs'),
    path = require('path'),
    geofilter = module.exports = require('./dist/geofilter'),
    extraModules = fs.readdirSync(path.resolve(__dirname, 'dist'));
    
function not(filename) {
    return function(file) {
        return file.toLowerCase() !== filename.toLowerCase();
    };
}

// patch in the additional modules
extraModules.filter(not('geofilter.js')).forEach(function(file) {
    require('./dist/' + file);
});