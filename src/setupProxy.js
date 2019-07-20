const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/model-server', {
        target: 'http://model-server:1111', pathRewrite: {
            '^/model-server/': '/'
        }
    }));
};