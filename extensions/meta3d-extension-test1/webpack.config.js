const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const isProd = process.env.NODE_ENV === undefined ? false : process.env.NODE_ENV.trim() == 'production';
const isProd = true
const isDevelopment = !isProd;

module.exports = {
    entry: "./src/Main.ts",
    mode: isProd ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].js',
        library: {
            name: 'ExtensionTest1',
            type: 'umd',
            umdNamedDefine: true,
        },
    },

    // // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
        modules: ['node_modules']
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    }
};