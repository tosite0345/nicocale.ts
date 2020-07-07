import { Container } from 'inversify'
import { symbols } from './symbols'
import * as u from './usecases'
import * as r from './repositories'
import * as c from './controllers'

const dev = process.env.NODE_ENV === 'development'

export const container = new Container()

// Controllers
container.bind(symbols.helloController).to(c.HelloController)
container.bind(symbols.userController).to(c.UserController)

// Usecases
container.bind(symbols.sayHelloUsecase).to(u.SayHelloUsecaseImpl)
container.bind(symbols.sayByeUsecase).to(u.SayByeUsecaseImpl)
container.bind(symbols.userFindAllUsecase).to(u.UserFindAllUsecaseImpl)
container.bind(symbols.userFindUsecase).to(u.UserFindUsecaseImpl)
container.bind(symbols.userCreateUsecase).to(u.UserCreateUsecaseImpl)

// Repositories
container.bind(symbols.userRepository).to(dev ? r.FakeUserRepository : r.TypeormUserRepository)
