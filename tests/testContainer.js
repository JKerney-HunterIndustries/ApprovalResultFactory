'use strict';
'use strict';

var config = {
    cwd: __dirname,
    modulePaths: [
        '',
        'test-utilities',
        '../app',
        '../app/wrappedModules',
    ],
    allowOverride: false,
    eagerLoad: false
};

module.exports = require('dject').new(config);