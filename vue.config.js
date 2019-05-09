module.exports = {
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: '8080',
        proxy: {
            '/api': {
                target: 'http://qrcode.gogodjzhu.com/api/v1/',
                changOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}