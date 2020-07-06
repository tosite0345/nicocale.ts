// 3. Application Business Rules
import { injectable } from 'inversify'

export interface UserFindUsecaseResponse {
  id: number
  name: string
}

export interface UserFindUsecase {
  execute(id: number): Promise<UserFindUsecaseResponse>
}

@injectable()
export class UserFindUsecaseImpl implements UserFindUsecase {
  public async execute(id: number): Promise<UserFindUsecaseResponse> {
    return {
      id: 1,
      name: 'tosite',
    }
  }
}
