import { Router } from 'express'
import { helloRouter } from './hello'
import { userRouter } from './user'
import { loginRouter } from './login'

export const apiRouter = Router()

apiRouter.use('/hello', helloRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/login', loginRouter)
