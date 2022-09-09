const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: "./lib/js/src/Main.bs.js",
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'static/js/[name].js',
		library: {
			name: 'Extension',
			type: 'window',
		},
	},

	// Enable sourcemaps for debugging webpack's output.
	// devtool: "source-map",

	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
		modules: ['node_modules']
	},

	module: {
		rules: [
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
		// new HtmlWebpackPlugin({
		// 	template: './user.html',
		// 	filename: 'user.html',
		// }),
	],
	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {
	}
};