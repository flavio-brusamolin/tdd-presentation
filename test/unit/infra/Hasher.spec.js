const Hasher = require('../../../src/infra/Hasher')
const bcrypt = require('bcrypt')

jest.mock('bcrypt', () => ({
  hash: async () => 'any_hash'
}))

describe('Hasher', () => {
  describe('#hash', () => {
    const makeFakeInput = () => 'any_value'
    const makeSut = () => new Hasher()

    it('should call bcrypt#hash with correct values', async () => {
      const hasher = makeSut()
      const hashSpyOnBCrypt = jest.spyOn(bcrypt, 'hash')

      const value = makeFakeInput()
      await hasher.hash(value)

      expect(hashSpyOnBCrypt).toHaveBeenCalledWith(value, 12)
    })

    it('should return the generated hash', async () => {
      const hasher = makeSut()

      const value = makeFakeInput()
      const hash = await hasher.hash(value)

      expect(hash).toBe('any_hash')
    })
  })
})
