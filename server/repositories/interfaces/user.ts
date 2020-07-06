export class UserResponse {
  public id: number
  public name: string
  public point: number

  public constructor(arg?: Partial<UserResponse>) {
    arg = arg ? arg : {}
    this.id = arg.id || 0
    this.name = arg.name || ''
    this.point = arg.point || 0
  }
}

export interface UserRepositoryResponse {
  id: number
  name: string
  point: number
}
export interface UserCreateRequest {
  id: number
  name: string
  point: number
}

export interface UserRepository {
  create(v: UserCreateRequest): Promise<UserResponse>
  find(username: string): Promise<UserRepositoryResponse>
  findByPoint(point: number): Promise<UserRepositoryResponse[]>
  add(username: string, point: number): Promise<void>
}
