var CopyWebpackPlugin = require('copy-webpack-plugin');

function getWebpackCommonConfig(projectRoot, environment, appConfig, baseHref) {
    return {
        // inserted line
        target: 'electron-renderer',
        plugins: [
            // inserted lines
            new CopyWebpackPlugin([{
                context: path.resolve(appRoot),
                from: "index.js"
            }]),
        ],
    };
}
exports.getWebpackCommonConfig = getWebpackCommonConfig;
