const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
        './src/index'
    ],
    output: {
        path: path.resolve('./bundles/'),
        filename: '[name].js',
        publicPath: 'http://localhost:3000/bundles/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new NpmInstallPlugin()
    ],

    module: {
        // preLoaders: [
        //     {
        //         test: /\.jsx?$/,
        //         loader: 'eslint-loader',
        //         exclude: /node_modules/
        //     }
        // ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['stage-2', 'es2015', 'react'],
                    plugins: ['transform-decorators-legacy', 'transform-class-properties']
                }
            },
            {
                test: /static-styles.*\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /^(?!.*(static-styles)).*scss$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                    'sass?sourceMap'
                ]
            },
            {
                test: /\.less/,
                loader: 'style!css!less'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }
        ]   
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },

    // cf https://webpack.github.io/docs/configuration.html#devtool
    devtool: 'cheap-module-eval-source-map'
};
