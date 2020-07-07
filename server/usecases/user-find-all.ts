// 3. Application Business Rules
import { injectable, inject } from 'inversify'
import { UserRepository } from '../repositories'
import { symbols } from '../symbols'

export interface UserFindAllUsecaseResponse {
  id: string
  name: string
  point: number
}

export interface UserFindAllUsecase {
  execute(): Promise<UserFindAllUsecaseResponse[]>
}

@injectable()
export class UserFindAllUsecaseImpl implements UserFindAllUsecase {
  private userRepo: UserRepository

  public constructor(
    @inject(symbols.userRepository) userRepo: UserRepository
  ) {
    this.userRepo = userRepo
  }
  public async execute(): Promise<UserFindAllUsecaseResponse[]> {
    return this.userRepo.findAll()
  }
}
