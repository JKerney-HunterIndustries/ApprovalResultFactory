'use strict';

const path = require('path');

var config = {
    cwd: path.join(__dirname, 'app'),
    modulePaths: [
        '',
        'wrappedModules',
    ],
    allowOverride: false,
    eagerLoad: false
};

module.exports = require('dject').new(config);