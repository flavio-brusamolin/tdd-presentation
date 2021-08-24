class CreateAccountService {
  constructor ({ hasher, accountRepository, tokenHandler }) {
    this._hasher = hasher
    this._accountRepository = accountRepository
    this._tokenHandler = tokenHandler
  }

  async execute (accountData) {
    const hashedPassword = await this._hasher.hash(accountData.password)

    const account = await this._accountRepository.store({
      ...accountData,
      password: hashedPassword
    })

    const token = await this._tokenHandler.generate(account.id)

    return { token }
  }
}

module.exports = CreateAccountService
