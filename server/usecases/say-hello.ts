// 3. Application Business Rules

import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import { CommentEntity } from '../entities'
import { UserRepository } from '../repositories'

export interface SayHelloUsecase {
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
