import 'reflect-metadata'
import {Nuxt, Builder} from 'nuxt'
import config from '../nuxt.config'
import express, { Router, Request, Response, NextFunction } from 'express'
import { container, symbols, HelloController } from './sample'

/**
 * Promise で書かれた Express のルーティングをラップしエラーハンドラーで検知できるようにします
 * @link http://expressjs.com/ja/advanced/best-practice-performance.html#promises
 */
type routeFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
export const rescue = (fn: routeFunction): routeFunction => (req, res, next) => fn(req, res, next).catch(next)

const app = express()
const isProd = (process.env.NODE_ENV === 'production')
const port = parseInt(process.env.PORT || '3000', 10)

config.dev = !isProd
const nuxt = new Nuxt(config)

const router = Router()
const controller = container.get<HelloController>(symbols.helloController)

router.get('/', rescue(async (req, res) => {
    const username = req.query.username
    if (!username || typeof username !== 'string') {
      res.sendStatus(400)
      return
    }
    const result = await controller.sayHello(username)
    res.json(result)
}))

app.use('/api', router)
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
