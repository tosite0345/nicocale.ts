export const symbols = {
  // Controllers
  helloController: Symbol.for('helloController'),
  userController: Symbol.for('userController'),

  // Usecases
  sayHelloUsecase: Symbol.for('sayHelloUsecase'),
  sayByeUsecase: Symbol.for('sayByeUsecase'),
  userFindAllUsecase: Symbol.for('userFindAllUsecase'),

  // Repositories
  userRepository: Symbol.for('userRepository'),
}
