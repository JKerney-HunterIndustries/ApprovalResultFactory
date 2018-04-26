'use strict';

function resultBuilderFactory(
    signet
) {
    function getArgs(spy) {
        if (Boolean(spy.args)) {
            return spy.args;
        }

        return spy.getOnCallAction().args;
    }

    function transformArgument(spy, parmeterIndex, transformer) {
        if(isSpy(spy)) {
            getArgs(spy).forEach(arg => arg[parmeterIndex] = transformer(arg[parmeterIndex]));
            
        }
    }

    function preParseArgument(spy, parmeterIndex) {
        transformArgument(spy, parmeterIndex, (JSON.parse));
    }

    const isSpy = signet.isTypeOf('spyFunction');

    function resultFactory(baseResult) {
        let result = Boolean(baseResult) ? baseResult : {};

        function addFakeService(fakeObject) {
            let keys = (
                Object
                    .keys(fakeObject)
                    .filter(key => isSpy(fakeObject[key]))
            );

            keys.forEach(key => result[`${fakeObject.__name}.${key}`] = getArgs(fakeObject[key]));
        }

        function addFakeServices(fakeObjects) {
            fakeObjects.forEach(addFakeService);
        }

        function addDatum(name, datum) {
            result[name] = datum;
        }

        function addData(data) {
            data.forEach(datum => result[datum[0]] = datum[1]);
        }

        function addCall(name, spyFunction) {
            let args = getArgs(spyFunction);
            if (args.length === 0) {
                return;
            }

            addDatum(name, args);
        }

        function addCalls(calls) {
            calls.forEach(call => {
                addCall(call[0], call[1]);
            });
        }

        return {
            getResult: signet.enforce(
                '() => object',
                () => result
            ),
            addCall: signet.enforce(
                'name, spyFunction:function => undefined',
                addCall
            ),
            addCalls: signet.enforce(
                'calls:array<tuple<name, spyFunction:function>> => undefined',
                addCalls
            ),
            addDatum: signet.enforce(
                'name, data:* => undefined',
                addDatum
            ),
            addData: signet.enforce(
                'data:array<tuple<name, *>> => undefined',
                addData
            ),
            addFakeService: signet.enforce(
                'fakeObject => undefined',
                addFakeService
            ),
            addFakeServices: signet.enforce(
                'fakeObjects:array<fakeObject> => undefined',
                addFakeServices
            )
        };
    }

    let factory = signet.enforce(
        'baseResult:maybe<object> => object',
        resultFactory
    );

    factory.preParseArgument = signet.enforce(
        'spy:function, parmeterIndex:int => undefined',
        preParseArgument
    );
        
    factory.transformArgument = signet.enforce(
        'spy:function, parmeterIndex:leftBoundedInt<0>, transformer:function<* => *> => undefined',transformArgument
    );

    return factory;
}

module.exports = resultBuilderFactory;