// 2. Interface and Adapters

import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import { SayHelloUsecase, SayByeUsecase } from '../usecases'

@injectable()
export class HelloController {
  private sayHelloUsecase: SayHelloUsecase
  private sayByeUsecase: SayByeUsecase

  public constructor(
    @inject(symbols.sayHelloUsecase) sayHelloUsecase: SayHelloUsecase,
    @inject(symbols.sayByeUsecase) sayByeUsecase: SayHelloUsecase,
  ) {
    this.sayHelloUsecase = sayHelloUsecase
    this.sayByeUsecase = sayByeUsecase
  }

  public async sayHello(username: string) {
    return await this.sayHelloUsecase.execute(username)
  }
  public async sayBye(username: string) {
    return await this.sayByeUsecase.execute(username)
  }
}
