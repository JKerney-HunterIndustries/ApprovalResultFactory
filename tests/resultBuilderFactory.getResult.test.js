'use strict';

describe('resultBuilderFactory', function () {
    const container = require('../djectContainer');
    const toolsContainer = require('./testContainer');

    const assert = toolsContainer.build('chai').assert;

    let resultBuilderFactory;

    beforeEach(function () {
        const testContainer = container.new();

        resultBuilderFactory = testContainer.build('resultBuilderFactory');
    });

    describe('getResult', function () {
        it('returns an empty object, if nothing has been done', function () {
            let result = resultBuilderFactory().getResult();

            assert.deepEqual(result, {});
        });

        it('returns unmodified starting object if nothing is done and a starting object is given', function () {
            let startObject = { thing: 'myThing' };

            let newObject = Object.assign({}, startObject);

            let result = resultBuilderFactory(newObject).getResult();

            assert.deepEqual(result, startObject);
        });
    });
});