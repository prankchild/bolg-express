const dbConfig = require('../../util/dbConfig')
const util = require('../../util/util')
/**
 * 查询留言数据
 * 需要携带的参数： limit,条数,page,页数
 */
const findMessage = async (req, res) => {
  //  获取所需查询条件
  const queryList = req.body
  const limit = queryList.limit
  const page = queryList.page
  const startLimit = Number(page) <= 0 ? 0 : (Number(page) - 1) * limit
  const endLimit = Number(page) <= 0 ? 10 : (Number(page)) * limit
  // 查询数据库有多少条父元素为0的数据
  const findMessageLength = async (startLimit, endLimit) => {
    const sql = 'select count(*) as total from message where messageFather = 0'
    const result = await dbConfig.SySqlConnect(sql, [])
    return result
  }
  const messageTotal = (await findMessageLength())[0].total
  //  根据页面数量查询数据库
  const findMessageDB = async (startLimit, endLimit) => {
    const sql = 'select message.*,user.userId,user.userName,user.userAvatar from message INNER JOIN user where messageFather in (0) and user.userId = message.userId limit ?,?'
    const result = await dbConfig.SySqlConnect(sql, [startLimit, endLimit])
    return result
  }
  // 获取到原始数据，之后需要对原始数据进行处理
  const original = await findMessageDB(startLimit, endLimit)
  const messageIdList = original.map(item => {
    return item.messageId
  })
  // 获取到孩子的元素
  const findMessageChild = async (ids) => {
    const sql = 'select message.*,user.userId,user.userName,user.userAvatar from message INNER JOIN user where messageFather in (?) and user.userId = message.userId'
    const result = await dbConfig.SySqlConnect(sql, [messageIdList])
    return result
  }
  const childList = await findMessageChild(messageIdList)
  original.forEach(item => {
    item.messageCreateTime = util.convertUTCTimeToLocalTime(item.messageCreateTime)
    for (let i = 0; i < childList.length; i++) {
      if (Number(item.messageId) === Number(childList[i].messageFather)) {
        if (!item.children) {
          item.children = []
        }
        childList[i].messageCreateTime = util.convertUTCTimeToLocalTime(childList[i].messageCreateTime)
        item.children.push(childList[i])
      }
    }
  })
  res.send({
    status: 200,
    code: 1,
    messageTotal,
    data: { messageList: original, messageTotal }
  })
}
const findMessageLength = async (req, res) => {
  // 查询数据库有多少条父元素为0的数据
  const findMessageFatherLength = async (startLimit, endLimit) => {
    const sql = 'select count(*) as total from message where messageFather = 0'
    const result = await dbConfig.SySqlConnect(sql, [])
    return result
  }
  const result = await findMessageFatherLength()
  res.send({
    status: 200, code: 1, data: result
  })
}
const addMessage = async (req, res) => {
  const userId = req.body.userId
  const messageContent = req.body.messageContent
  const messageFather = req.body.messageFather
  const addMessageSql = async (userId, messageContent, messageFather) => {
    const sql = 'INSERT INTO message (userId,messageContent,messageFather) VALUES (?,?,?)'
    const result = dbConfig.SySqlConnect(sql, [userId, messageContent, messageFather])
    return result
  }
  const result = await addMessageSql(userId, messageContent, messageFather)
  console.log(result)
  if (result && result.insertId) {
    res.send({
      status: 200,
      code: 1,
      result
    })
  }
}
module.exports = { findMessage, findMessageLength, addMessage }
