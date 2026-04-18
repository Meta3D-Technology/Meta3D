const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const WriteFilePlugin = require('write-file-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const isProduction = !isDevelopment;

module.exports = {
    entry: "./lib/es6_global/src/Main.bs.js",
    mode: process.env.NODE_ENV.trim() == 'production' ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].js',
    },


    devServer: {
        compress: true,
        historyApiFallback: true,
        port: 8090,
        open: true,
        // devMiddleware: {
        //     writeToDisk: true,
        // },


        static: [
            { directory: path.resolve(__dirname, 'static/'), publicPath: '/static', watch: false },
            { directory: path.resolve(__dirname, 'unit-mod/'), publicPath: '/unit-mod', watch: false },
        ],
    },

    // // 将 cache 改为 memory 或删除
    // cache: {
    //     type: 'memory',   // 改为 memory，或者直接删除整个 cache 对象
    //     // 如果使用 memory 不需要 buildDependencies
    // },

    // 1. 启用持久化缓存（webpack 5）
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename], // 配置变更时缓存失效
        },
    },


    // 确保 watchOptions 拼写正确
    watchOptions: {
        ignored: ['**/node_modules', '**/dist', '**/.git', '**/System Volume Information'],
        aggregateTimeout: 300,
        poll: false,
    },


    // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",

    resolve: {
        // extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
        extensions: ['.js', '.jsx', '.css'],
        symlinks: false,
        modules: ['node_modules'],
        fallback: { "crypto": false }

    },

    module: {
        rules: [
            {
                test: /\.css$/,
                // 开发环境不抽离 CSS，用 style-loader 热更新更快
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.ttf$/,
                type: 'asset/resource',
            },
            // 如果项目中有图片、字体等资源，可以添加：
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource',
            // },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 生产环境才抽离 CSS
        ...(isProduction ? [
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash].css',
            }),
        ] : []),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            // 生产环境压缩 HTML
            ...(isProduction && { minify: { collapseWhitespace: true } }),
        }),
        // 4. 限制 Monaco 语言包（只加载 TypeScript）
        new MonacoWebpackPlugin({
            languages: ['typescript'],
            // 可选：排除某些模块减小体积
            // features: ['!gotoSymbol', '!suggest'],
        }),
    ],

    // 5. 优化分块策略（减少重复打包）
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                monaco: {
                    test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
                    name: 'monaco',
                    chunks: 'all',
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: -10,
                },
            },
        },
        // 生产环境开启代码压缩
        minimize: isProduction,
    },
    // // When importing a module whose path matches one of the following, just
    // // assume a corresponding global variable exists and use that instead.
    // // This is important because it allows us to avoid bundling all of our
    // // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};