'use strict';

function stubcontractorConfig(
    path,
    stubcontractor
) {
    const stubcontractorConfig = {
        cwd: path.join(__dirname, '../'),
        sourceDirectories: [
            './stubleFiles',
        ]
    };

    return stubcontractor(stubcontractorConfig);
}

module.exports = stubcontractorConfig;