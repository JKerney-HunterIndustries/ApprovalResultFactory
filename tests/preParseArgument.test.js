'use strict';

describe('resultBuilderFactory', function () {
    const container = require('../djectContainer');
    const toolsContainer = require('./testContainer');

    toolsContainer.build('approvalsConfig')();

    const sinon = toolsContainer.build('sinon');
    const stubcontractor = toolsContainer.build('stubcontractorConfig');
    const { asInformationString } = toolsContainer.build('objectInformation');

    let resultBuilderFactory;

    beforeEach(function () {
        const testContainer = container.new();

        resultBuilderFactory = testContainer.build('resultBuilderFactory');
    });

    describe('preParseArgument', function () {
        it('converts a json string into a json object', function () {
            let resultBuilder = resultBuilderFactory();

            let jsonString1 = JSON.stringify({ name: 'my object 1', age: 43, answer: 42 });
            let jsonString2 = JSON.stringify({ name: 'my object 2', pokemon: 'dido', food:'candy', age: 2 });

            let fakeFunction = sinon.spy();
            fakeFunction(1, 2, 3, jsonString1, 4, 5);
            fakeFunction(6, 7, 8, jsonString2, 9, 10);

            resultBuilderFactory.preParseArgument(fakeFunction, 3);

            resultBuilder.addCall('fakeFunction', fakeFunction);

            this.verify(asInformationString(resultBuilder.getResult()));
        });
    });
});