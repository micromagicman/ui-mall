const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
    entry: {
        'ui-components': './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: argv.mode === 'production'
            ? '[name].js'
            : '[name].development.js',
        libraryTarget: 'umd'
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React'
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
            cleanOnceBeforeBuildPatterns: ['*']
        })
    ]
});