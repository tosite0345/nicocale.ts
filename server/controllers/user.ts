// 2. Interface and Adapters

import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import { UserFindAllUsecase, UserFindUsecase, UserCreateUsecase } from '../usecases'
import { UserCreateRequest } from '../repositories'

@injectable()
export class UserController {
  private /* A. */userFindAllUsecase: UserFindAllUsecase
  private userFindUsecase: UserFindUsecase
  private userCreateUsecase: UserCreateUsecase

  public constructor(
    @inject(symbols.userFindAllUsecase) /* A. */userFindAllUsecase: UserFindAllUsecase,
    @inject(symbols.userFindUsecase) userFindUsecase: UserFindUsecase,
    @inject(symbols.userCreateUsecase) userCreateUsecase: UserCreateUsecase,
  ) {
    this./* A. */userFindAllUsecase = /* A. */userFindAllUsecase
    this.userFindUsecase = userFindUsecase
    this.userCreateUsecase = userCreateUsecase
  }

  public async findAll() {
    return await this.userFindAllUsecase.execute()
  }
  public async find(id: string) {
    return await this.userFindUsecase.execute(id)
  }

  public async create(args: UserCreateRequest) {
    return await this.userCreateUsecase.execute(args)
  }
}
