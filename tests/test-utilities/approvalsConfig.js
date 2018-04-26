'use strict';

function approvalsConfig() {
    const approvalsLocation = './tests/approvals';
    const approvalsConfigFactory = require('approvals-config-factory');

    const approvalsConfig = approvalsConfigFactory.buildApprovalsConfig({
        reporter: 'meld',
        errorOnStaleApprovedFiles: false
    });

    return function setup() {
        return require('approvals').configure(approvalsConfig).mocha(approvalsLocation);
    };
}

module.exports = approvalsConfig;