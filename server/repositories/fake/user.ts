// 2. Interface and Adapters (TypeORM ăŽ Repositories)

import { injectable, inject } from 'inversify'
import { UserRepository, UserRepositoryResponse } from '../../repositories'

@injectable()
export class FakeUserRepository implements UserRepository {
  private static userList: UserRepositoryResponse[] = [
    {
      id: 1,
      name: 'tosite',
      point: 1,
    },
    {
      id: 2,
      name: 'zuckey',
      point: 2,
    }
  ]

  async find(username: string): Promise<UserRepositoryResponse> {
    const target = FakeUserRepository.userList.find((user) => {
      return user.name === username
    })
    if (!target) {
      throw new Error('not found')
    }
    return target
  }

  async findByPoint(point: number): Promise<UserRepositoryResponse[]> {
    const result = FakeUserRepository.userList.filter((user) => user.point === point)
    return result
  }

  async add(username: string, point: number) {
    (await this.find(username)).point =+ point
  }
}
