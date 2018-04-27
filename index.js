'use strict';

const container = require('./djectContainer');

const factory = container.build('resultBuilderFactory');
const signet = container.build('signet');

const types = {
    isSpyFunction: signet.isTypeOf('spyFunction')
};

factory.types = types;

module.exports = factory;