'use strict';

describe('resultBuilderFactory', function () {
    const container = require('../djectContainer');
    const toolsContainer = require('./testContainer');

    const assert = toolsContainer.build('chai').assert;
    const sinon = toolsContainer.build('sinon');
    const stubcontractor = toolsContainer.build('stubcontractorConfig');

    let resultBuilderFactory;

    beforeEach(function () {
        const testContainer = container.new();

        resultBuilderFactory = testContainer.build('resultBuilderFactory');
    });

    describe('addCall', function () {
        it('does not add a sinon spy if it has not been called', function () {
            let someMethod = sinon.spy();

            let resultBuilder = resultBuilderFactory();
            resultBuilder.addCall('someMethodName', someMethod);

            assert.deepEqual(resultBuilder.getResult(), { });
        });

        it('addes a sinon spy if the spy has been called', function () {
            let someMethod = sinon.spy();
            someMethod(1, 'second', null);

            let resultBuilder = resultBuilderFactory();
            resultBuilder.addCall('someMethodName', someMethod);

            let expected = {
                someMethodName: [
                    [
                        1,
                        'second',
                        null,
                    ]
                ]
            };

            assert.deepEqual(resultBuilder.getResult(), expected);
        });

        it('addes a sinon spy to a given starting object if the spy has been called', function () {
            let someMethod = sinon.spy();
            someMethod(1, 'second', null);

            let resultBuilder = resultBuilderFactory({ start: 'started here' });
            resultBuilder.addCall('someMethodName', someMethod);

            let expected = {
                start: 'started here',
                someMethodName: [
                    [
                        1,
                        'second',
                        null,
                    ]
                ]
            };

            assert.deepEqual(resultBuilder.getResult(), expected);
        });

        it('does not add a stubcontractor method with a spy if it has not been called', function () {
            let fakeFunction = stubcontractor.buildFunctionFake(function (one, two) {}).onCall(sinon.spy());
            let resultBuilder = resultBuilderFactory();

            resultBuilder.addCall('My Function', fakeFunction);
            assert.deepEqual(resultBuilder.getResult(), { });
        });

        it('adds a stubcontractor method with a spy if it has been called', function () {
            let fakeFunction = stubcontractor.buildFunctionFake(function (one, two) {}).onCall(sinon.spy());
            let resultBuilder = resultBuilderFactory();

            fakeFunction(1, 2);

            let expeted = {
                'My Function': [
                    [
                        1,
                        2,
                    ],
                ],
            };

            resultBuilder.addCall('My Function', fakeFunction);
            assert.deepEqual(resultBuilder.getResult(), expeted);
        });

        it('adds a stubcontractor method with a spy to a given starting object if the spy has been called', function () {
            let fakeFunction = stubcontractor.buildFunctionFake(function (one, two) {}).onCall(sinon.spy());
            fakeFunction(1, 'second');

            let resultBuilder = resultBuilderFactory({ start: 'started here' });
            resultBuilder.addCall('someMethodName', fakeFunction);

            let expected = {
                start: 'started here',
                someMethodName: [
                    [
                        1,
                        'second',
                    ]
                ]
            };

            assert.deepEqual(resultBuilder.getResult(), expected);
        });
    });
});