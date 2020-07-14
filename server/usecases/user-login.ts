// 3. Application Business Rules
import { injectable, inject } from 'inversify'
import { UserRepository } from '../repositories'
import { symbols } from '../symbols'

export interface UserLoginUsecaseRequest {
  id: string | null
  authToken?: string
}

export interface UserLoginUsecaseResponse {
  id: string
  authToken: string
}

export interface UserLoginUsecase {
  execute(arg: UserLoginUsecaseRequest): Promise<UserLoginUsecaseResponse>
}

@injectable()
export class UserLoginUsecaseImpl implements UserLoginUsecase {
  private userRepo: UserRepository

  public constructor(
    @inject(symbols.userRepository) userRepo: UserRepository
  ) {
    this.userRepo = userRepo
  }
  public async execute(arg: UserLoginUsecaseRequest): Promise<UserLoginUsecaseResponse> {
    return {
      id: 'ok',
      authToken: 'token',
    }
  }
}
