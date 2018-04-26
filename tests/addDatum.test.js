'use strict';

describe('resultBuilderFactory', function () {
    const container = require('../djectContainer');
    const toolsContainer = require('./testContainer');

    toolsContainer.build('approvalsConfig')();

    const { asInformationString } = toolsContainer.build('objectInformation');

    let resultBuilderFactory;

    beforeEach(function () {
        const testContainer = container.new();

        resultBuilderFactory = testContainer.build('resultBuilderFactory');
    });

    describe('addDatum', function () {
        it('adds some data to the result', function () {
            let resultBuilder = resultBuilderFactory();

            resultBuilder.addDatum('add string', 'value string');
            resultBuilder.addDatum('added int', 5);
            resultBuilder.addDatum('added null', null);

            this.verify(asInformationString(resultBuilder.getResult()));
        });
    });
});