'use strict';

function signet(
    types
) {
    const signet = require('signet')();
    types(signet);
    return signet;
}

module.exports = signet;