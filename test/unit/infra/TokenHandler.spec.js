const TokenHandler = require('../../../src/infra/TokenHandler')
const jwt = require('jsonwebtoken')

jest.mock('jsonwebtoken', () => ({
  sign: () => 'any_token'
}))

describe('TokenHandler', () => {
  describe('#generate', () => {
    const makeFakeInput = () => 'any_id'
    const makeSut = () => new TokenHandler()

    it('should call jwt#sign with correct values', () => {
      const tokenHandler = makeSut()
      const signSpyOnJwt = jest.spyOn(jwt, 'sign')

      const id = makeFakeInput()
      tokenHandler.generate(id)

      expect(signSpyOnJwt).toHaveBeenCalledWith({ id }, '$secret!')
    })

    it('should return the generated token', () => {
      const tokenHandler = makeSut()

      const id = makeFakeInput()
      const token = tokenHandler.generate(id)

      expect(token).toBe('any_token')
    })
  })
})
