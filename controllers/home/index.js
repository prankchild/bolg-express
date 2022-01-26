// 获取轮播图图片
const getSwiper = (req, res) => {
  const status = 200
  res.send({
    status,
    code: 1,
    data: 'data'
  })
}
module.exports = { getSwiper }
