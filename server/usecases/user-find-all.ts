// 3. Application Business Rules
import { injectable } from 'inversify'

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
  public async execute(): Promise<UserFindAllUsecaseResponse[]> {
    return [
      {
        id: '8580d5ab-ec45-26dc-11f5-1ed3a4622282',
        name: 'tosite',
        point: 10,
      },
      {
        id: '0019af89-8703-cb7b-7dca-9cf981f9a1b8',
        name: 'zuckey',
        point: 10,
      },
    ]
  }
}
