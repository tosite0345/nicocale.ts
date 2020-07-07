// 3. Application Business Rules
import { injectable, inject } from 'inversify'
import { UserRepository, UserResponse } from '../repositories'
import { symbols } from '../symbols'

export interface UserFindUsecaseResponse {
  id: string
  name: string
  point: number
}

export interface UserFindUsecase {
  execute(id: string): Promise<UserFindUsecaseResponse>
}

@injectable()
export class UserFindUsecaseImpl implements UserFindUsecase {
  private userRepo: UserRepository

  public constructor(
    @inject(symbols.userRepository) userRepo: UserRepository
  ) {
    this.userRepo = userRepo
  }

  public async execute(id: string): Promise<UserFindUsecaseResponse> {
    return this.userRepo.find(id)
  }
}
