export interface UserRepositoryResponse {
  id: number
  name: string
  point: number
}

export interface UserRepository {
  find(username: string): Promise<UserRepositoryResponse>
  findByPoint(point: number): Promise<UserRepositoryResponse[]>
  add(username: string, point: number): Promise<void>
}
