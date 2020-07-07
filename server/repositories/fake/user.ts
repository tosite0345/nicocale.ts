// 2. Interface and Adapters (TypeORM の Repositories)

import { injectable, inject } from 'inversify'
import { v4 as uuid } from 'uuid'
import { UserRepository, UserCreateRequest, UserResponse, UserRepositoryResponse } from '../../repositories'
import { UpdateQueryBuilder } from 'typeorm'

@injectable()
export class FakeUserRepository implements UserRepository {
  private static userList: UserRepositoryResponse[] = [
    {
      id: '8580d5ab-ec45-26dc-11f5-1ed3a4622282',
      name: 'tosite',
      point: 1,
    },
    {
      id: '0019af89-8703-cb7b-7dca-9cf981f9a1b8',
      name: 'zuckey',
      point: 2,
    }
  ]

  public async find(id: string): Promise<UserRepositoryResponse> {
    const target = FakeUserRepository.userList.find((user) => {
      return user.id === id
    })
    if (!target) {
      throw new Error('not found')
    }
    return target
  }

  public async findAll(): Promise<UserRepositoryResponse[]> {
    return FakeUserRepository.userList
  }

  public async create(arg: UserCreateRequest): Promise<UserResponse> {
    const user = {
      id: uuid(),
      name: arg.name,
      point: arg.point
    }
    FakeUserRepository.userList.push(user)
    return user
  }

  async findByPoint(point: number): Promise<UserRepositoryResponse[]> {
    const result = FakeUserRepository.userList.filter((user) => user.point === point)
    return result
  }

  async add(username: string, point: number) {
    (await this.find(username)).point =+ point
  }
}
