const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: "./src/Main.ts",
    mode: process.env.NODE_ENV.trim() == 'production' ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].js',
    },


    // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.package'],
        symlinks: false,
        modules: ['node_modules'],
        fallback: { "crypto": false }
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.package$/,
                use: "arraybuffer-loader"
            },
        ]
    },
    plugins: [
        /**
        * All files inside webpack's output.path directory will be removed once, but the
        * directory itself will not be. If using webpack 4+'s default configuration,
        * everything under <PROJECT_DIR>/dist/ will be removed.
        * Use cleanOnceBeforeBuildPatterns to override this behavior.
        *
        * During rebuilds, all webpack assets that are not used anymore
        * will be removed automatically.
        *
        * See `Options and Defaults` for information
        */
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        	template: './index.html',
        	filename: 'index.html',
        }),
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    }
};