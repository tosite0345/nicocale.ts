import { Router } from 'express'
import { symbols } from '../../symbols'
import { container } from '../../inversify.config'
import { rescue } from '../../utils/rescue'
import { UserController } from '../../controllers'

export const userRouter = Router()

const controller = container.get<UserController>(symbols.userController)

userRouter.get('/', rescue(async (req, res) => {
    const result = await controller.findAll()
    res.json(result)
}))
