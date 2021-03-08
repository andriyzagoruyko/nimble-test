const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
    const isDevelopment = options.mode === 'development';

    return {
        entry: {
            main: ['./src/index.js'],
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'app.js',
            publicPath: '/dist/',
        },
        devServer: {
            overlay: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: '/node-modules',
                },
                {
                    test: /\.module\.s(a|c)ss$/,
                    use: [
                        isDevelopment
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: isDevelopment,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment,
                            },
                        },
                    ],
                },
                {
                    test: /^((?!\.module).)*\.s(a|c)ss$/,
                    exclude: /\.module.(s(a|c)ss)$/,
                    use: [
                        isDevelopment
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment,
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ],
        },
        plugins: [new MiniCssExtractPlugin({ filename: 'app.css' })],

        resolve: {
            extensions: ['.js', '.jsx', '.scss'],
        },

        devtool: isDevelopment
            ? 'eval-cheap-module-source-map'
            : false,

        target: isDevelopment ? 'web' : 'browserslist',
    };
};
