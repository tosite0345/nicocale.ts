import { Router, Request, Response } from 'express'
import { symbols } from '../../symbols'
import { container } from '../../inversify.config'
import { rescue } from '../../utils/rescue'
import { LoginController } from '../../controllers'
import Passport from 'passport'

export const loginRouter = Router()
const controller = container.get<LoginController>(symbols.loginController)

loginRouter.post(
    '/',
    Passport.authenticate('local', { session: false }),
    rescue(async (req: Request, res: Response) => {
        res.json({ok: 'ok'})
    })
)
