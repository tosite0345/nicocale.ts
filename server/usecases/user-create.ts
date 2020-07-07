// 3. Application Business Rules
import { injectable, inject } from 'inversify'
import { UserRepository, UserResponse } from '../repositories'
import { symbols } from '../symbols'

export interface UserCreateUsecaseResponse {
  id: string
  name: string
  point: number
}

export interface UserCreateRequest {
  name: string
  point: number
}

export interface UserCreateUsecase {
  execute(arg: UserCreateRequest): Promise<UserCreateUsecaseResponse>
}

@injectable()
export class UserCreateUsecaseImpl implements UserCreateUsecase {
  private userRepo: UserRepository

  public constructor(
    @inject(symbols.userRepository) userRepo: UserRepository
  ) {
    this.userRepo = userRepo
  }

  public async execute(arg: UserCreateRequest): Promise<UserCreateUsecaseResponse> {
    return this.userRepo.create(arg)
  }
}
