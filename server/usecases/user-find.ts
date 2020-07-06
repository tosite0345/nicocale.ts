// 3. Application Business Rules
import { injectable } from 'inversify'

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
  public async execute(id: string): Promise<UserFindUsecaseResponse> {
    return {
      id: '8580d5ab-ec45-26dc-11f5-1ed3a4622282',
      name: 'tosite',
      point: 10
    }
  }
}
