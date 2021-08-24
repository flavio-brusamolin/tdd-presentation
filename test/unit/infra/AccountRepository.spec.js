const AccountRepository = require('../../../src/infra/AccountRepository')
const { accountData } = require('../../support/models')

jest.mock('uuid', () => ({
  v4: () => 'any_uuid'
}))

describe('AccountRepository', () => {
  describe('#store', () => {
    const makeFakeInput = () => ({ ...accountData, password: 'any_hash' })
    const makeSut = () => new AccountRepository()

    it('should insert a new record in the account list', async () => {
      const accountRepository = makeSut()

      const accountData = makeFakeInput()
      await accountRepository.store(accountData)

      expect(AccountRepository._accounts).toContainEqual(({
        ...accountData,
        id: 'any_uuid'
      }))
    })

    it('should return the saved account', async () => {
      const accountRepository = makeSut()

      const accountData = makeFakeInput()
      const account = await accountRepository.store(accountData)

      expect(account).toEqual({
        ...accountData,
        id: 'any_uuid'
      })
    })
  })
})
