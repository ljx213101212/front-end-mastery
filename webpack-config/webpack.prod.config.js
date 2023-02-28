const common = require("./webpack.common.config.js")
const { merge } = require("webpack-merge")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')
const glob = require('glob')
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    entry: './src/js/index.js',
    devtool: 'source-map',
    output: {
        filename: 'js/[name].[contenthash:12].js',
        publicPath: '/static/'
    },
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            '...',
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true }
                        }
                    ]
                }
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['imagemin-mozjpeg', { quality: 40 }],
                            ['imagemin-pngquant', {
                                quality: [0.65, 0.90],
                                speed: 4
                            }],
                            ['imagemin-gifsicle', { interlaced: true }],
                            ['imagemin-svgo', {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                                addAttributesToSVGElement: {
                                                    params: {
                                                        attributes: [
                                                            { xmlns: 'http://www.w3.org/2000/svg' }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }]
                        ]
                    }
                },
                generator: [
                    {
                        type: 'asset',
                        preset: 'webp-custom-name',
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: ['imagemin-webp']
                        }
                    }
                ]
            })
        ],
        runtimeChunk: 'single',
        splitChunks: {
            //[Strategy #2]: Specifying Criteria for code spliting.
            chunks: 'all',
            maxSize: Infinity,
            minSize: 2000,
            //[Strategy #4]: Creating a JS bundle for each dependency.
            cacheGroups: {
                // Make jquery and bootstrap into lazy loading(async)
                // jquery: {
                //     test: /[\\/]node_modules[\\/]jquery[\\/]/,
                //     name: 'jquery',
                //     priority: 2
                // },
                // bootstrap: {
                //     test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
                //     name: 'bootstrap',
                //     priority: 2
                // },
                lodash: {
                    test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
                    name: 'lodash-es',
                    //to make the bundle seperate (if not will be merge into node_modules_bundle)
                    priority: 2
                },
                emotion: {
                    test: /[\\/]node_modules[\\/]@emotion[\\/]/,
                    name: 'emotion',
                    priority: 1
                },
                corejs: {
                    test: /[\\/]node_modules[\\/]core-js[\\/]/,
                    name: 'corejs',
                    priority: 1
                },
                node_modules: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'node_modules_bundle',
                    chunks: 'initial'
                },
                async: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                    name(module, chunks) {
                        return chunks.map(chunk => chunk.name).join('-')
                    }
                }
            }
            //#[Strategy #3]: Putting node_modules into its Own Bundle.
            // cacheGroups: {
            //     node_modules: {
            //         test: /[\\/]node_modules[\\/]/,
            //         //name: 'node_modules'
            //         name(module) {
            //             const packageName = module.context.match(
            //                 /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            //             )[1]
            //             return packageName
            //         }
            //     }
            // }
            // name(module, chunks, cacheGroupKey) {
            //     const filePathAsArray = module.identifier().split('/')
            //     return filePathAsArray[filePathAsArray.length - 1]
            // },

            //[Strategy #1]: Extracting Heavy Dependencies into Seperate bundles
            // cacheGroups: {
            //     lodash_es: {
            //         test: /[\\/]src[\\/]js[\\/]event-handlers.js[\\/]/,
            //         chunks: 'initial',
            //         name: "lodash_es"
            //     },
            //     core_js: {
            //         test: /[\\/]node_modules[\\/]core-js[\\/]/,
            //         chunks: 'initial',
            //         name: 'core_js'
            //     },
            //     emotion: {
            //         test: /[\\/]node_modules[\\/][\\@]emotion[\\/]/,
            //         chunks: 'async',
            //         name: "emotion"
            //     },
            // }
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[hash:base64]'
                        }
                    }
                }]
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Work with autoprefixer
                    "postcss-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                ]

            },
            {
                test: /\.(png|jpg|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: './images/[name].[contenthash:12][ext]'
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 40
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:12].css'
        }),
        //[TODO]: check why add this will break the global styles in using, it is supposted to only purse un-used css.
        // new PurgeCSSPlugin({
        //     paths: glob.sync(`${path.join(__dirname)}/src/**/*`, { nodir: true })
        // }),
        new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: "gzip",
            test: /\.(js|css)$/,
        }),
        new CompressionPlugin({
            filename: '[path][base].br',
            algorithm: "brotliCompress",
            test: /\.(js|css)$/,
            compressionOptions: { level: 11 }
        }),
    ],

})