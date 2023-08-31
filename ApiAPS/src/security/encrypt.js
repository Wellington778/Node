const bcrypt = require('bcrypt')

async function encryptPassword(password){
    const rounds = 10

    const salts = await bcrypt.genSalt(rounds)
    const encryptPassword = await bcrypt.hash(password,salts)

    return encryptPassword
}

module.exports = encryptPassword