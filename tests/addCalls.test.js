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

    describe('addCalls', function () {
        it('only sinon spies that have been called', function () {
            let resultBuilder = resultBuilderFactory();

            let spy1 = sinon.spy();
            let spy2 = sinon.spy();
            let spy3 = sinon.spy();
            let contracted1 = stubcontractor.buildFunctionFake(function (one, two) { }).onCall(sinon.spy());
            let contracted2 = stubcontractor.buildFunctionFake(function (one) { }).onCall(sinon.spy());


            spy1('spy1', 'called');
            spy3('spy', 3, 'called');
            contracted2('contractor 2 called');

            resultBuilder.addCalls([
                ['first spy', spy1],
                ['second spy', spy2],
                ['third spy', spy3],
                ['first contracted', contracted1],
                ['second contracted', contracted2],
            ]);

            this.verify(asInformationString(resultBuilder.getResult()));
        });
    });
});