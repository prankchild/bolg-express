
const mysql = require('mysql2')

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'boluoblog',
  charset: 'utf8mb4',
  connectionLimit: 10
}

const pool = mysql.createPool(config)

const SySqlConnect = (sySql, sqlArr) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, conn) {
      console.log('123')
      if (err) {
        reject(err)
      } else {
        conn.query(sySql, sqlArr, (err, data) => {
          // conn.release()
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      }
      conn.release()
    })
    // pool.releaseConnection(conn)
  }).catch((err) => {
    console.log(err)
  })
}

module.exports = {
  SySqlConnect
}
