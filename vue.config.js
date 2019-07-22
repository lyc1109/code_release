const isProduct = process.env.NODE_ENV === 'production'
const CompressionPlugin = require("compression-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    // publicPath: isProduct ? '' : '/',
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: '8080',
        proxy: {
            '/api': {
                // target: 'http://qrcode.gogodjzhu.com',
                target: 'http://www.lzd10238.com',
                changOrigin: true,
                pathRewrite: {
                    '^/api': '/api/v1'
                }
            }
        }
    },
    configureWebpack: config => {
        if (isProduct) {
            config.externals = {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'moment': 'moment'
            }
            return {
                plugins: ([
                    new CompressionPlugin({
                        test: /\.js$|\.html$|.\css/, //匹配文件名
                        threshold: 1,//对超过10k的数据压缩
                        deleteOriginalAssets: false //不删除源文件
                    }),
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: {
                                drop_console: true,//console
                                drop_debugger: false,
                                pure_funcs: ['console.log']//移除console
                            }
                        }
                    })
                ])
            }
        } else {
            console.log(config)
        }
    }
}