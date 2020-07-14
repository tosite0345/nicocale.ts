import { Router, Request, Response } from 'express'
import { symbols } from '../../symbols'
import { container } from '../../inversify.config'
import { rescue } from '../../utils/rescue'
import { LoginController } from '../../controllers'

export const loginRouter = Router()

const controller = container.get<LoginController>(symbols.loginController)

loginRouter.post('/', rescue(async (req: Request, res: Response) => {
    const result = await controller.login({
        id: req.body.id,
        authToken: req.body.authToken
    })
    res.json(result)
}))
