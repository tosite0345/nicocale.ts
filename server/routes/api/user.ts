import { Router, Request, Response } from 'express'
import { symbols } from '../../symbols'
import { container } from '../../inversify.config'
import { rescue } from '../../utils/rescue'
import { UserController } from '../../controllers'

export const userRouter = Router()

const controller = container.get<UserController>(symbols.userController)

userRouter.get('/', rescue(async (req: Request, res: Response) => {
    const result = await controller.findAll()
    res.json(result)
}))

userRouter.post('/', rescue(async (req: Request, res: Response) => {
    const result = await controller.create({
        name: req.body.name,
        point: req.body.point
    })
    res.json(result)
}))

userRouter.get('/:id', rescue(async (req: Request, res: Response) => {
    const result = await controller.find(req.params.id)
    res.json(result)
}))
