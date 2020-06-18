// 2. Interface and Adapters

import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import { UserFindAllUsecase, UserFindUsecase } from '../usecases'

@injectable()
export class UserController {
  private /* A. */userFindAllUsecase: UserFindAllUsecase
  private userFindUsecase: UserFindUsecase

  public constructor(
    @inject(symbols.userFindAllUsecase) /* A. */userFindAllUsecase: UserFindAllUsecase,
    @inject(symbols.userFindUsecase) userFindUsecase: UserFindUsecase,
  ) {
    this./* A. */userFindAllUsecase = /* A. */userFindAllUsecase
    this.userFindUsecase = userFindUsecase
  }

  public async findAll() {
    return await this.userFindAllUsecase.execute()
  }
  public async find(id: number) {
    return await this.userFindUsecase.execute(id)
  }
}
