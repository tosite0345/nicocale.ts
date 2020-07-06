import { Router } from 'express'
import { helloRouter } from './hello'
import { userRouter } from './user'

export const apiRouter = Router()

apiRouter.use('/hello', helloRouter)
apiRouter.use('/user', userRouter)
