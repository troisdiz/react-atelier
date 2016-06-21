var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: [
        './src/index'
    ],
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: '[name].[hash].js'
    },

    plugins: [
        // only keep fr locale for moment.js
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                // use true for analysis
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new AssetsPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        function() {
            // webpack fails with a code 0 without those lines
            // thanks to https://github.com/webpack/webpack/issues/708
            this.plugin('done', function(stats) {
                if (stats.compilation.errors && stats.compilation.errors.length) {
                    console.log(stats.compilation.errors);
                    process.exit(1);
                }
            });
        }
    ],

    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [
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
    }
}
