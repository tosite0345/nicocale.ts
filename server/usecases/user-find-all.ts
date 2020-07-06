// 3. Application Business Rules
import { injectable } from 'inversify'

export interface UserFindAllUsecaseResponse {
  id: number
  name: string
}

export interface UserFindAllUsecase {
  execute(): Promise<UserFindAllUsecaseResponse[]>
}

@injectable()
export class UserFindAllUsecaseImpl implements UserFindAllUsecase {
  public async execute(): Promise<UserFindAllUsecaseResponse[]> {
    return [
      {
        id: 1,
        name: 'tosite',
      },
      {
        id: 2,
        name: 'zuckey',
      },
    ]
  }
}
