import express, { Router, Request, Response, NextFunction } from 'express'

// 2. Controllers -> Interface and Adapters
export class HelloController {
  private sayHelloUsecase: SayHelloUsecase

  public constructor(
    sayHelloUsecase: SayHelloUsecase
  ) {
    this.sayHelloUsecase = sayHelloUsecase
  }

  public sayHello(username: string) {
    // const usecase = new SayHelloUsecase() このままではコントローラーがUseCaseに依存しているので依存を排除する
    return this.sayHelloUsecase.execute(username)
  }
}

// 4. Entities -> Enterprise Business Rules
export class CommentEntity {
  public makeHello(username: string) {
    return `${username}=サン ドーモコンニチハ。`
  }
}

// 3. Usecases -> Application Business Rules
export interface SayHelloUsecase {
  execute(username: string)
}

export class SayHelloUsecaseImpl implements SayHelloUsecase {
  public execute(username: string) {
    const ce = new CommentEntity()
    return { hello: ce.makeHello(username) }
  }
}

// 2. Reposiotories -> Interface and Adapters
export class UserRepository {
  private userList = {
    tosite: 0,
    zuckey: 1,
    orzup: 2,
    litencat: 3,
  }
  
  async find(username: string): Promise<any> {
    if (!this.userList[username]) {
      throw new Error('not found')
    }
    return this.userList[username]
  }
}

// 1. Express -> Frameworks and Drivers
const router = Router()
const controller = new HelloController(
  new SayHelloUsecaseImpl(),
)
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const username: string = req.body.username
  const result = controller.sayHello(username)
  res.json(res)
})
