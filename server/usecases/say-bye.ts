// 3. Application Business Rules
import { injectable } from 'inversify'

export interface SayByeUsecase {
  execute(username: string): Promise<string>
}

@injectable()
export class SayByeUsecaseImpl implements SayByeUsecase {
  public async execute(username: string): Promise<string> {
    return 'remember perl harvor'
  }
}
