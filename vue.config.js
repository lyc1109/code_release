const isProduct = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: isProduct ? '' : '/',
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
    configureWebpack: {
        output: {
            publicPath: '/public/'
        }
    }
}