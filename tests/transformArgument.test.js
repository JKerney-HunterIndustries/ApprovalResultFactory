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

    describe('transformArgument', function () {
        it('allows editing of a spies arguments', function () {
            let fakeFunction = sinon.spy();
            let resultBuilder = resultBuilderFactory();

            fakeFunction(1, 2, 3, 4);
            fakeFunction(5, 6, 7, 8);

            resultBuilderFactory.transformArgument(fakeFunction, 1, value => `${value}`);

            resultBuilder.addCall('myFunction', fakeFunction);
            this.verify(asInformationString(resultBuilder.getResult()));
        });

        it('allows editing of a contracted spies arguments', function () {
            let fakeFunction = stubcontractor.buildFunctionFake(function (one, two, three, four) { }).onCall(sinon.spy());
            let resultBuilder = resultBuilderFactory();

            fakeFunction(1, 2, 3, 4);
            fakeFunction(5, 6, 7, 8);

            resultBuilderFactory.transformArgument(fakeFunction, 1, value => `${value}`);

            resultBuilder.addCall('myFunction', fakeFunction);
            this.verify(asInformationString(resultBuilder.getResult()));
        });
    });
});