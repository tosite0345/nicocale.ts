export const symbols = {
  // Controllers
  helloController: Symbol.for('helloController'),
  userController: Symbol.for('userController'),
  loginController: Symbol.for('loginController'),

  // Usecases
  sayHelloUsecase: Symbol.for('sayHelloUsecase'),
  sayByeUsecase: Symbol.for('sayByeUsecase'),
  userFindAllUsecase: Symbol.for('userFindAllUsecase'),
  userFindUsecase: Symbol.for('userFindUsecase'),
  userCreateUsecase: Symbol.for('userCreateUsecase'),
  userLoginUsecase: Symbol.for('userLoginUsecase'),

  // Repositories
  userRepository: Symbol.for('userRepository'),
}
