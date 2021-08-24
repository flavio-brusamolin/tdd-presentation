const bcrypt = require('bcrypt')

class Hasher {
  async hash (value) {
    const salt = 12
    return await bcrypt.hash(value, salt)
  }
}

module.exports = Hasher
