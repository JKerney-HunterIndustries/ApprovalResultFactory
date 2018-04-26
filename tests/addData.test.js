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

    describe('addData', function () {
        it('adds some data to the result', function () {
            let resultBuilder = resultBuilderFactory();

            resultBuilder.addData(
                [
                    ['add string', 'value string'],
                    ['added int', 5],
                    ['added null', null],
                ]
            );

            this.verify(asInformationString(resultBuilder.getResult()));
        });
    });
});