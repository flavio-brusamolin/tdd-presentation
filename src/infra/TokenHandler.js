const jwt = require('jsonwebtoken')

class TokenHandler {
  generate (id) {
    const secret = '$secret!'
    return jwt.sign({ id }, secret)
  }
}

module.exports = TokenHandler
