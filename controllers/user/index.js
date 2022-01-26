const dbConfig = require('../../util/dbConfig')
const login = async (req, res) => {
  const userEmail = req.body.userEmail
  const userPassword = req.body.userPassword
  const loginSql = async (userEmail, userPassword) => {
    const sql = 'select userId,userName,userEmail,userAvatar,userLabel from user where userEmail = ? and userPassword = ? '
    const loginResult = await dbConfig.SySqlConnect(sql, [userEmail, userPassword])
    return loginResult
  }
  const result = await loginSql(userEmail, userPassword)
  if (result && result.length > 0) {
    res.send({
      status: 200,
      code: 1,
      result
    })
  }
}

module.exports = { login }
