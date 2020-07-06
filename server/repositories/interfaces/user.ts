import { v4 as uuid } from 'uuid'

export class UserResponse {
  public id: string
  public name: string
  public point: number

  public constructor(arg?: Partial<UserResponse>) {
    arg = arg ? arg : {}
    this.id = uuid()
    this.name = arg.name || ''
    this.point = arg.point || 0
  }
}

export interface UserRepositoryResponse {
  id: string
  name: string
  point: number
}
export interface UserCreateRequest {
  name: string
  point: number
}

export interface UserRepository {
  create(v: UserCreateRequest): Promise<UserResponse>
  find(username: string): Promise<UserRepositoryResponse>
  findByPoint(point: number): Promise<UserRepositoryResponse[]>
  add(username: string, point: number): Promise<void>
}
