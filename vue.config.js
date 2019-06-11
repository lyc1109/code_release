const isProduct = process.env.NODE_ENV === 'production'
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
    // publicPath: isProduct ? '' : '/',
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: '8080',
        proxy: {
            '/api': {
                target: 'http://qrcode.gogodjzhu.com',
                changOrigin: true,
                pathRewrite: {
                    '^/api': '/api/v1'
                }
            }
        }
    },
    configureWebpack: config => {
        if(isProduct){
            return{
                plugins: [
                    new CompressionPlugin({
                        test:/\.js$|\.html$|.\css/, //匹配文件名
                        threshold: 10240,//对超过10k的数据压缩
                        deleteOriginalAssets: false //不删除源文件
                    })
                ]
            }
        } else
            console.log(config)

    }
}