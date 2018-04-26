'use strict';

function prettyJson() {
    function getFunctionName(value, showSignature) {
        let functionName = value.name === '' ? 'anonymous function' : value.name;
        let functionSignature = Boolean(value.signature) ? ` [${value.signature}]` : ' [* => *]';
        functionSignature = showSignature ? functionSignature : '';

        return `Function: ${functionName}${functionSignature}`;
    }

    function functionToName(value, showSignature) {
        return typeof value === 'function' ? getFunctionName(value, showSignature) : value;
    }

    function preprocessValues(showSignature) {
        return function (key, value) {
            return functionToName(value, showSignature);
        };
    }

    function prettyJsonAndSignature(value, showSignature) {
        return JSON.stringify(value, preprocessValues(showSignature), 4);
    }

    function prettyJsonWithSignature(value) {
        return prettyJsonAndSignature(value, true);
    }

    function prettyJson(value) {
        return prettyJsonAndSignature(value, false);
    }

    function asJson(value, indent) {
        return JSON.stringify(value, null, indent);
    }

    function asFormattedJson(value) {
        return asJson(value, 4);
    }

    return {
        asJson,
        asFormattedJson,
        prettyJson,
        prettyJsonWithSignature,
    };
}

module.exports = prettyJson;