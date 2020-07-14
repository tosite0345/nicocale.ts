// 2. Interface and Adapters

import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import { UserLoginUsecase } from '../usecases'
import { UserLoginUsecaseRequest } from '../usecases'

@injectable()
export class LoginController {
  private userLoginUsecase: UserLoginUsecase

  public constructor(
    @inject(symbols.userLoginUsecase) userLoginUsecase: UserLoginUsecase,
  ) {
    this.userLoginUsecase = userLoginUsecase
  }

  public async login(args: UserLoginUsecaseRequest) {
    return await this.userLoginUsecase.execute(args)
  }
}
