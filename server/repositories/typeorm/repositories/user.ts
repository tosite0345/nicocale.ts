// 2. Interface and Adapters (TypeORM の Repository)

import { getManager } from 'typeorm'
import { injectable } from 'inversify'
import { v4 as uuid } from 'uuid'
import { TypeormUserEntity } from '../entities/user'
import { UserRepository, UserResponse, UserCreateRequest } from '../../../repositories'

@injectable()
export class TypeormUserRepository implements UserRepository {
  async find(username: string) {
    const mgr = getManager()
    const res = await mgr.findOne(TypeormUserEntity, { name: username })
    if (!res) {
      throw new Error('not found')
    }
    return {
      id: res.id,
      name: res.name,
      point: 0,
    }
  }

  public async create(arg: UserCreateRequest): Promise<UserResponse> {
    const entity = new TypeormUserEntity()
    entity.id = uuid()
    entity.name = arg.name
    entity.point = arg.point
    const mgr = getManager()
    return new UserResponse(await mgr.save(entity))
  }

  async findByPoint(point: number) {
    const mgr = getManager()
    const result = await mgr.find(TypeormUserEntity, { point })
    return result.filter((user) => user.point === point)
      .map((v) => ({
        id: v.id,
        name: v.name,
        point: 0,
      }))
  }

  async add(username: string, point: number) {
    const mgr = getManager()
    const res = await mgr.findOne(TypeormUserEntity, { name: username })
    if (!res) {
      throw new Error('not found')
    }
    await mgr.save(TypeormUserEntity, {
      id: res.id,
      point: res.point + point,
    })
  }
}
