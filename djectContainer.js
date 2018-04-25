'use strict';

var config = {
    cwd: __dirname + '/app',
    modulePaths: [
        './',
        './wrappedModules',
    ],
    allowOverride: false,
    eagerLoad: false
};

module.exports = require('dject').new(config);