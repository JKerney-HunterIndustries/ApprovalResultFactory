'use strict';
'use strict';

const path = require('path');

var config = {
    cwd: path.join(__dirname),
    modulePaths: [
        '',
        'test-utilities',
        '../app/wrappedModules',
    ],
    allowOverride: false,
    eagerLoad: false
};

module.exports = require('dject').new(config);