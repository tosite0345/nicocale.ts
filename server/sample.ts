import { getManager } from 'typeorm'
import { User }  from './repositories/typeorm/entity/User'
import { injectable, inject, Container } from 'inversify'
import express, { Router, Request, Response, NextFunction } from 'express'

// 4. Entities -> Enterprise Business Rules -----------------
export class CommentEntity {
  public makeHello(username: string) {
    return `${username}=サン ドーモコンニチハ。`
  }
}

// 3. Usecases -> Application Business Rules -----------------
export interface SayHelloUsecase {
  execute(username: string)
}

export interface SayByeUsecase {
  execute(username: string)
}

@injectable()
export class SayHelloUsecaseImpl implements SayHelloUsecase {
  private userRepo: UserRepository

  public constructor(
    @inject(symbols.userRepository) userRepo: UserRepository
  ) {
    this.userRepo = userRepo
  }
  public execute(username: string) {
    const result = this.userRepo.find(username)
    const ce = new CommentEntity()
    return { hello: ce.makeHello(username) }
  }
}

@injectable()
export class SayByeUsecaseImpl implements SayByeUsecase {
  execute(username: string) {
    return 'remember perl harvor'
  }
}

// 2. Reposiotories -> Interface and Adapters -----------------
export interface UserRepository {
  find(username: string): Promise<number>
  add(username: string, point: number): Promise<void>
}

@injectable()
export class FakeUserRepository implements UserRepository {
  private static userList = {
    tosite: 0,
    zuckey: 1,
    orzup: 2,
    litencat: 3,
  }

  async find(username: string) {
    if (!FakeUserRepository.userList[username]) {
      throw new Error('not found')
    }
    return FakeUserRepository.userList[username]
  }

  async add(username: string, point: number) {
    FakeUserRepository.userList[username] =+ point
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
    return res.id
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

  public sayHello(username: string) {
    return this.sayHelloUsecase.execute(username)
  }
  public sayBye(username: string) {
    return this.sayByeUsecase.execute(username)
  }
}

// X. Dependency Injection -----------------
const symbols = {
  sayHelloUsecase: Symbol.for('sayHelloUsecase'),
  sayByeUsecase: Symbol.for('sayByeUsecase'),
  userRepository: Symbol.for('userRepository'),
  helloController: Symbol.for('helloController'),
}

const container = new Container()
const dev = process.env.NODE_ENV === 'development'
container.bind(symbols.sayHelloUsecase).to(SayHelloUsecaseImpl)
container.bind(symbols.sayByeUsecase).to(SayByeUsecaseImpl)
container.bind(symbols.userRepository).to(dev ? FakeUserRepository : TypeOrmUserRepository)
container.bind(symbols.helloController).to(HelloController)

// 1. Express -> Frameworks and Drivers -----------------
const router = Router()
const controller = container.get<HelloController>(symbols.helloController)

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const username: string = req.body.username
  if (!username) {
    res.sendStatus(400)
  }

  // ↓ プログラムを破壊するやり方
  // HelloController.prototype.sayHello = (username: string) => {
  //   console.log('ばーーーーーーか')
  // }

  // ↓ テスト専用の書き方
  // jest.spyOn(HelloContoroller.prototype, 'sayHello').mockResolvedValue(() => {
  //   console.log('ばーーーーーーか')
  // })
  // jest.mockRestore()

  const result = controller.sayHello(username)
  res.json(res)
})