import 'reflect-metadata'
import { Nuxt, Builder } from 'nuxt'
import config from '../nuxt.config'
import express from 'express'
import { apiRouter } from './routes/api'
import * as bodyParser from 'body-parser'
import Passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const app = express()
const isProd = (process.env.NODE_ENV === 'production')
const port = parseInt(process.env.PORT || '3000', 10)

config.dev = !isProd
const nuxt = new Nuxt(config)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
Passport.use(
    new LocalStrategy(
        async (username, password, done) => {
            console.log('in')
            try {
                console.log('ok')
                return done(null, {id: '1', name: 'ok', point: 1})
            } catch (error) {
                console.log('ng')
                return done(error)
            }
        }
    )
)
app.use(Passport.initialize())
app.use('/api/', apiRouter)
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
