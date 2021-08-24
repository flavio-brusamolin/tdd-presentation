const { v4: uuid } = require('uuid')

class AccountRepository {
  static _accounts = []

  async store (accountData) {
    const account = { id: uuid(), ...accountData }
    AccountRepository._accounts.push(account)

    return account
  }
}

module.exports = AccountRepository
