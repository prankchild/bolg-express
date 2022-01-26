const dbConfig = require('../../util/dbConfig')

const findBarrage = async (req, res) => {
  const findBarrageSql = async () => {
    const sql = 'SELECT barrage.*,user.userId,user.userName,user.userAvatar from user INNER JOIN barrage where user.userId = barrage.userId'
    const findResult = await dbConfig.SySqlConnect(sql, [])
    return findResult
  }
  const data = await findBarrageSql()
  res.send({
    status: 200,
    code: 1,
    data: data
  })
}
/*
 * 参数： barrageContent 文本内容  userId 用户ID
 * 用户ID 1.当为0时候即是游客身份发布 2.为正常用户ID
 */
const addBarrage = async (req, res) => {
  const barrageContent = req.body.barrageContent
  const userId = req.body.userId
  const addBarrageSql = async (barrageContent, userId) => {
    const sql = 'INSERT INTO barrage (barrageContent, userId) VALUES (?,?)'
    const addResult = await dbConfig.SySqlConnect(sql, [barrageContent, userId])
    return addResult
  }
  const data = await addBarrageSql(barrageContent, userId)
  res.send({
    status: 200,
    code: 1,
    data: data
  })
}

const findBarrageLength = async (req, res) => {
  const findBarrageLengthSql = async () => {
    const sql = 'select count(*) as total from barrage'
    const result = await dbConfig.SySqlConnect(sql, [])
    return result
  }
  const result = await findBarrageLengthSql()
  if (result && result.length > 0) {
    res.send({
      status: 200,
      code: 1,
      data: result
    })
  }
}
module.exports = { findBarrage, addBarrage, findBarrageLength }
