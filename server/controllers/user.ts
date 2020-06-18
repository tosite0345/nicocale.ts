// 2. Interface and Adapters

import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import { UserFindAllUsecase } from '../usecases'

@injectable()
export class UserController {
  private /* A. */userFindAllUsecase: UserFindAllUsecase

  public constructor(
    @inject(symbols.userFindAllUsecase) /* A. */userFindAllUsecase: UserFindAllUsecase,
  ) {
    this./* A. */userFindAllUsecase = /* A. */userFindAllUsecase
  }

  public async findAll() {
    return await this.userFindAllUsecase.execute()
  }
}
