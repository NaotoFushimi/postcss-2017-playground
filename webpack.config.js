const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const isProduction = process.env.NODE_ENV === "production";

const webpackPlugins = [
    new WebpackNotifierPlugin({alwaysNotify: true}),
];

if (isProduction){
    //プロダクションのみ圧縮
    webpackPlugins.push(new webpack.optimize.UglifyJsPlugin({
        output: { comments: uglifySaveLicense }
    }));
}

module.exports = {
    entry: {
        bundle : './src/index.css'
    },
    output: {
        filename: 'build/[name].css',
    },
    devtool: isProduction ? false : 'source-map' , //プロダクションではソースマップを吐かない
    cache:true,
    resolve: {
        extensions: [ '.css'],
        modules : ['node_modules']
    },
    plugins: webpackPlugins,
    module: {
        rules: [
            {
                test: /\.css$/,
                use : [
                    {
                        loader:"postcss-loader",
                        options : {
                            plugins: () => [
                                require('postcss-cssnext'),
                                require('postcss-flow-root')({fallback:"clearfix"}),
                                require('postcss-grid-kiss'),
                                require('postcss-flexbugs-fixes'),
                                require("postcss-import"),
                            ]
                        }
                    }
                ]
            },
        ]
    },
    performance: {
        hints: false
    }
}
