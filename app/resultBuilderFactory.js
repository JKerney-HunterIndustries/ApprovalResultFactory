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
            return builder;
        }

        function addFakeServices(fakeObjects) {
            fakeObjects.forEach(addFakeService);
            return builder;
        }

        function addDatum(name, datum) {
            result[name] = datum;
            return builder;
        }

        function addData(data) {
            data.forEach(datum => result[datum[0]] = datum[1]);
            return builder;
        }

        function addCall(name, spyFunction) {
            let args = getArgs(spyFunction);
            if (args.length === 0) {
                return builder;
            }

            addDatum(name, args);

            return builder;
        }

        function addCalls(calls) {
            calls.forEach(call => {
                addCall(call[0], call[1]);
            });

            return builder;
        }

        const builder = {
            getResult: signet.enforce(
                '() => object',
                () => result
            ),
            addCall: signet.enforce(
                'name, spyFunction:function => resultBuilder',
                addCall
            ),
            addCalls: signet.enforce(
                'calls:array<tuple<name, spyFunction:function>> => resultBuilder',
                addCalls
            ),
            addDatum: signet.enforce(
                'name, data:* => resultBuilder',
                addDatum
            ),
            addData: signet.enforce(
                'data:array<tuple<name, *>> => resultBuilder',
                addData
            ),
            addFakeService: signet.enforce(
                'fakeObject => resultBuilder',
                addFakeService
            ),
            addFakeServices: signet.enforce(
                'fakeObjects:array<fakeObject> => resultBuilder',
                addFakeServices
            )
        };

        return builder;
    }

    let factory = signet.enforce(
        'baseResult:maybe<object> => resultBuilder',
        resultFactory
    );

    factory.preParseArgument = signet.enforce(
        'spy:function, parmeterIndex:int => undefined',
        preParseArgument
    );
        
    factory.transformArgument = signet.enforce(
        'spy:function, parmeterIndex:leftBoundedInt<0>, transformer:function<* => *> => undefined',
        transformArgument
    );

    return factory;
}

module.exports = resultBuilderFactory;