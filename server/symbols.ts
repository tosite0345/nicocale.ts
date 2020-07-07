export const symbols = {
  // Controllers
  helloController: Symbol.for('helloController'),
  userController: Symbol.for('userController'),

  // Usecases
  sayHelloUsecase: Symbol.for('sayHelloUsecase'),
  sayByeUsecase: Symbol.for('sayByeUsecase'),
  userFindAllUsecase: Symbol.for('userFindAllUsecase'),
  userFindUsecase: Symbol.for('userFindUsecase'),
  userCreateUsecase: Symbol.for('userCreateUsecase'),

  // Repositories
  userRepository: Symbol.for('userRepository'),
}
