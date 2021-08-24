const CreateAccountService = require('../../../src/app/CreateAccountService')
const { accountData, account } = require('../../support/models')

describe('CreateAccountService', () => {
  describe('#execute', () => {
    const makeFakeInput = () => accountData
    const makeFakeHasher = () => ({ hash: () => 'any_hash' })
    const makeFakeAccountRepository = () => ({ store: () => account })
    const makeFakeTokenHandler = () => ({ generate: () => 'any_token' })

    const makeSut = () => {
      const hasher = makeFakeHasher()
      const accountRepository = makeFakeAccountRepository()
      const tokenHandler = makeFakeTokenHandler()

      const createAccountService = new CreateAccountService({
        hasher,
        accountRepository,
        tokenHandler
      })

      return {
        createAccountService,
        hasher,
        accountRepository,
        tokenHandler
      }
    }

    it('should call Hasher#hash with correct values', async () => {
      const { createAccountService, hasher } = makeSut()
      const hashSpyOnHasher = jest.spyOn(hasher, 'hash')

      const accountData = makeFakeInput()
      await createAccountService.execute(accountData)

      expect(hashSpyOnHasher).toHaveBeenCalledWith(accountData.password)
    })

    it('should call AccountRepository#store with correct values', async () => {
      const { createAccountService, accountRepository } = makeSut()
      const storeSpyOnAccountRepository = jest.spyOn(accountRepository, 'store')

      const accountData = makeFakeInput()
      await createAccountService.execute(accountData)

      expect(storeSpyOnAccountRepository).toHaveBeenCalledWith({
        ...accountData,
        password: 'any_hash'
      })
    })

    it('should call TokenHandler#generate with correct values', async () => {
      const { createAccountService, tokenHandler } = makeSut()
      const generateSpyOnTokenHandler = jest.spyOn(tokenHandler, 'generate')

      const accountData = makeFakeInput()
      await createAccountService.execute(accountData)

      expect(generateSpyOnTokenHandler).toHaveBeenCalledWith(account.id)
    })

    it('should return the generated token', async () => {
      const { createAccountService } = makeSut()

      const accountData = makeFakeInput()
      const result = await createAccountService.execute(accountData)

      expect(result).toEqual({ token: 'any_token' })
    })
  })
})
