import { getManager } from 'typeorm'
import { User }  from './repositories/typeorm/entity/User'
import { injectable, inject, Container } from 'inversify'

// X. Dependency Injection -----------------
export const symbols = {
  sayHelloUsecase: Symbol.for('sayHelloUsecase'),
  sayByeUsecase: Symbol.for('sayByeUsecase'),
  userRepository: Symbol.for('userRepository'),
  helloController: Symbol.for('helloController'),
}

// 4. Entities -> Enterprise Business Rules -----------------
export class CommentEntity {
  public makeHello(username: string) {
    return `${username}=サン ドーモコンニチハ。`
  }
}

// 3. Usecases -> Application Business Rules -----------------
export interface SayHelloUsecase {
  execute(username: string): Promise<string>
}

export interface SayByeUsecase {
  execute(username: string): Promise<string>
}

@injectable()
export class SayHelloUsecaseImpl implements SayHelloUsecase {
  private userRepo: UserRepository

  public constructor(
    @inject(symbols.userRepository) userRepo: UserRepository
  ) {
    this.userRepo = userRepo
  }
  public async execute(username: string): Promise<string> {
    const ce = new CommentEntity()
    return ce.makeHello(username)
  }
}

@injectable()
export class SayByeUsecaseImpl implements SayByeUsecase {
  public async execute(username: string): Promise<string> {
    return 'remember perl harvor'
  }
}

// 2. Reposiotories -> Interface and Adapters -----------------
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

@injectable()
export class TypeOrmUserRepository implements UserRepository {
  async find(username: string) {
    const mgr = getManager()
    const res = await mgr.findOne(User, { name: username })
    if (!res) {
      throw new Error('not found')
    }
    return {
      id: res.id,
      name: res.name,
      point: 0,
    }
  }

  async findByPoint(point: number) {
    const mgr = getManager()
    const result = await mgr.find(User, { point })
    return result.filter((user) => user.point === point)
      .map((v) => ({
        id: v.id,
        name: v.name,
        point: 0,
      }))
  }

  async add(username: string, point: number) {
    const mgr = getManager()
    const res = await mgr.findOne(User, { name: username })
    if (!res) {
      throw new Error('not found')
    }
    await mgr.save(User, {
      id: res.id,
      point: res.point + point,
    })
  }
}

// 2. Controllers -> Interface and Adapters -----------------
@injectable()
export class HelloController {
  private sayHelloUsecase: SayHelloUsecase
  private sayByeUsecase: SayByeUsecase

  public constructor(
    @inject(symbols.sayHelloUsecase) sayHelloUsecase: SayHelloUsecase,
    @inject(symbols.sayByeUsecase) sayByeUsecase: SayHelloUsecase,
  ) {
    this.sayHelloUsecase = sayHelloUsecase
    this.sayByeUsecase = sayByeUsecase
  }

  public async sayHello(username: string) {
    return await this.sayHelloUsecase.execute(username)
  }
  public async sayBye(username: string) {
    return await this.sayByeUsecase.execute(username)
  }
}

// X. DI Container

export const container = new Container()
const dev = process.env.NODE_ENV === 'development'
container.bind(symbols.sayHelloUsecase).to(SayHelloUsecaseImpl)
container.bind(symbols.sayByeUsecase).to(SayByeUsecaseImpl)
container.bind(symbols.userRepository).to(dev ? FakeUserRepository : TypeOrmUserRepository)
container.bind(symbols.helloController).to(HelloController)

// 1. Express -> Frameworks and Drivers -----------------
// goto index.ts
