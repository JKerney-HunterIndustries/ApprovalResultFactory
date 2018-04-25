'use strict';

function types() {
    function buildTypes(signet) {
        if (signet.isType('fakeObject')) {
            return;
        }

        signet.alias('name', 'string');

        signet.alias('maybe', 'variant<null, undefined, _>');

        signet.defineDuckType('fakeObject', {
            __name: 'name'
        });

        signet.subtype('function')('spyFunction', function (value) {
            return (
                (
                    Boolean(value.args)
                    && value.args.length > 0
                )
                || (
                    Boolean(value.getOnCallAction)
                    && Boolean(value.getOnCallAction().args)
                    && value.getOnCallAction().args.length > 0
                )
            );
        });
    }

    return buildTypes;
}

module.exports = types;