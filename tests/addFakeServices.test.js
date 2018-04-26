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

    describe('addFakeServices', function () {
        it('adds Services based on what was called', function () {
            let fakeService1 = {
                __name: 'fakeService1',
                one: sinon.spy(),
                two: stubcontractor.buildFunctionFake((first, second) => { }).onCall(sinon.spy()),
                three: sinon.spy(),
                four: stubcontractor.buildFunctionFake((first, second, third, fourth) => { }).onCall(sinon.spy()),
                five: stubcontractor.buildFunctionFake((first, second, third, fourth, fifth) => { }),
            };

            fakeService1.one('one called');
            fakeService1.four(1, '2', 3, 'four');
            fakeService1.five(1, '2', 3, 'four', 5);

            let fakeService2 = {
                __name: 'fakeService2',
                one: sinon.spy(),
                two: stubcontractor.buildFunctionFake((first, second) => { }).onCall(sinon.spy()),
                three: sinon.spy(),
                four: stubcontractor.buildFunctionFake((first, second, third, fourth) => { }).onCall(sinon.spy()),
                five: stubcontractor.buildFunctionFake((first, second, third, fourth, fifth) => { }),
            };

            fakeService2.five(1, '2', 3, 'four', 5);

            let fakeService3 = {
                __name: 'fakeService3',
                one: sinon.spy(),
                two: stubcontractor.buildFunctionFake((first, second) => { }).onCall(sinon.spy()),
                three: sinon.spy(),
                four: stubcontractor.buildFunctionFake((first, second, third, fourth) => { }).onCall(sinon.spy()),
                five: stubcontractor.buildFunctionFake((first, second, third, fourth, fifth) => { }),
            };

            fakeService3.three('three called');
            fakeService3.two(1, 'two');

            let resultBuilder = resultBuilderFactory();
            resultBuilder.addFakeServices([
                fakeService1,
                fakeService2,
                fakeService3,
            ]);

            this.verify(asInformationString(resultBuilder.getResult()));
        });
    });
});