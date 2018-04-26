'use strict';

describe('resultBuilderFactory', function () {
    const container = require('../djectContainer');
    const toolsContainer = require('./testContainer');

    toolsContainer.build('approvalsConfig')();

    const sinon = toolsContainer.build('sinon');
    const assert = toolsContainer.build('chai').assert;    
    const stubcontractor = toolsContainer.build('stubcontractorConfig');
    const { asInformationString } = toolsContainer.build('objectInformation');

    let resultBuilderFactory;

    beforeEach(function () {
        const testContainer = container.new();

        resultBuilderFactory = testContainer.build('resultBuilderFactory');
    });

    describe('addFakeService', function () {
        it('does not add a service where none of the fakes were called', function () {
            let fakeService = {
                __name: 'fakeService',
                one: sinon.spy(),
                two: stubcontractor.buildFunctionFake((first, second) => { }).onCall(sinon.spy()),
                three: sinon.spy(),
                four: stubcontractor.buildFunctionFake((first, second, third, fourth) => { }).onCall(sinon.spy()),
                five: stubcontractor.buildFunctionFake((first, second, third, fourth, fifth) => { }),
            };

            let resultBuilder = resultBuilderFactory();
            resultBuilder.addFakeService(fakeService);

            assert.deepEqual(resultBuilder.getResult(), {});
        });
        
        it('adds a service where fakes were called', function () {
            let fakeService = {
                __name: 'fakeService',
                one: sinon.spy(),
                two: stubcontractor.buildFunctionFake((first, second) => { }).onCall(sinon.spy()),
                three: sinon.spy(),
                four: stubcontractor.buildFunctionFake((first, second, third, fourth) => { }).onCall(sinon.spy()),
                five: stubcontractor.buildFunctionFake((first, second, third, fourth, fifth) => { }),
            };

            fakeService.one('one was called');
            fakeService.four(1, 2, 3, 4);
            fakeService.five(1, 2, 3, 4, 'five');

            let resultBuilder = resultBuilderFactory();
            resultBuilder.addFakeService(fakeService);

            this.verify(asInformationString(resultBuilder.getResult()));
        });
    });
});