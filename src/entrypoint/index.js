const Hasher = require('../infra/Hasher')
const AccountRepository = require('../infra/AccountRepository')
const TokenHandler = require('../infra/TokenHandler')
const CreateAccountService = require('../app/CreateAccountService')

const generateFakeAccount = () => ({
  name: 'Flavio Brito',
  email: 'flavio.brito@mail.com',
  password: '12345'
})

const makeCreateAccountService = () => {
  const hasher = new Hasher()
  const accountRepository = new AccountRepository()
  const tokenHandler = new TokenHandler()

  return new CreateAccountService({
    hasher,
    accountRepository,
    tokenHandler
  })
}

const createAccount = async ({ quantity }) => {
  for (let i = 0; i < quantity; i++) {
    const account = generateFakeAccount()
    const createAccountService = makeCreateAccountService()
    const response = await createAccountService.execute(account)
    console.log('Response: ', response)
  }
}

createAccount({ quantity: 3 })
