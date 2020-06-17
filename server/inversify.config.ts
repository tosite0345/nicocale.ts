import { Container } from 'inversify'
import { symbols } from './symbols'
import * as u from './usecases'
import * as r from './repositories'
import * as c from './controllers'

const dev = process.env.NODE_ENV === 'development'

export const container = new Container()

container.bind(symbols.sayHelloUsecase).to(u.SayHelloUsecaseImpl)
container.bind(symbols.sayByeUsecase).to(u.SayByeUsecaseImpl)
container.bind(symbols.userRepository).to(dev ? r.FakeUserRepository : r.TypeormUserRepository)
container.bind(symbols.helloController).to(c.HelloController)
