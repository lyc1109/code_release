const isProduct = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: isProduct ? './' : '/',
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: '8080',
        proxy: {
            '/api': {
                target: 'http://qrcode.gogodjzhu.com/api/v1',
                changOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}