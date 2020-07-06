import { Router } from 'express'
import { symbols } from '../../symbols'
import { container } from '../../inversify.config'
import { rescue } from '../../utils/rescue'
import { HelloController } from '../../controllers'

export const helloRouter = Router()

const controller = container.get<HelloController>(symbols.helloController)

helloRouter.get('/', rescue(async (req, res) => {
    const username = req.query.username
    if (!username || typeof username !== 'string') {
      res.sendStatus(400)
      return
    }
    const result = await controller.sayHello(username)
    res.json(result)
}))
