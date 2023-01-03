const { createProxyMiddleware } = require('http-proxy-middleware')

// module.exports = function (app) {
//     app.use(

//         createProxyMiddleware(
//             ['/api', '/ws'],
//             {
//                 target: 'http://localhost:8080',
//                 changeOrigin: true,
//                 ws: true,
//                 router: {
//                     '/ws': 'ws://localhost:8080'
//                 }
//             })
//     )
// }

module.exports = function (app) {
    app.use(
        "/ws",
        createProxyMiddleware({
            target: "http://localhost:8080", ws: true
        })
    )
}