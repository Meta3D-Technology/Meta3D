const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// bone_converter 独立 demo 构建配置（development 模式）
// 通过 dev-server static 托管 asset-lib 下的 FBX 资源，demo 以 URL 形式引用
const PORT = 8095;

module.exports = {
    entry: './demo/main.ts',
    mode: 'development',
    devtool: 'eval-source-map',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].js',
        clean: true,
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './demo/index.html',
            hash: true,
            filename: 'index.html',
            inject: true,
        }),
    ],

    devServer: {
        compress: true,
        port: PORT,
        open: true,
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        },
        static: [
            // 托管 demo/tripo_model（Tripo 原始模型），publicPath 为 /tripo-model
            {
                directory: path.resolve(__dirname, 'demo/tripo_model'),
                publicPath: '/tripo-model',
                watch: false,
            },
            // 托管仓库根目录的 asset-lib（含 Mixamo 动画），publicPath 为 /asset-lib
            {
                directory: path.resolve(__dirname, '../../asset-lib'),
                publicPath: '/asset-lib',
                watch: false,
            },
            // 托管 snapshot_EliteGiantess10（Tripo 原模型 + Mixamo 官方 lod2 绑骨），publicPath 为 /snapshot
            {
                directory: path.resolve(__dirname, 'demo/snapshot_EliteGiantess10'),
                publicPath: '/snapshot',
                watch: false,
            },
        ],
    },
};
