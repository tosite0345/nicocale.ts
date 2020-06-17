import 'reflect-metadata'
import {Nuxt, Builder} from 'nuxt'
import config from '../nuxt.config'
import express from 'express'
import * as apiRoutes from './routes/api'

const app = express()
const isProd = (process.env.NODE_ENV === 'production')
const port = parseInt(process.env.PORT || '3000', 10)

config.dev = !isProd
const nuxt = new Nuxt(config)

app.use('/api/hello', apiRoutes.helloRouter)
app.use(nuxt.render)

// ホットリローディングする開発モードのときのみビルドする
if (config.dev) {
    new Builder(nuxt).build().then(listen)
} else {
    listen()
}

function listen() {
    // サーバーを Listen する
    app.listen(port, '0.0.0.0', () => {
        console.log('Server listening on `localhost:' + port + '`.')
    })
}
