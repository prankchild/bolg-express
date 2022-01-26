
const express = require('express')
const router = express.Router()
// 控制器
const messageController = require('../controllers/message/index')
const barrageController = require('../controllers/barrage/index')
const userController = require('../controllers/user/index')
// 路由Api
const api = require('../api/api')

// 路由
// router.get(api.home.swiper, homeController.getSwiper)
router.post(api.message.findMessage, messageController.findMessage)
router.post(api.message.findMessageLength, messageController.findMessageLength)
router.post(api.barrage.findBarrage, barrageController.findBarrage)
router.post(api.barrage.addBarrage, barrageController.addBarrage)
router.post(api.barrage.findBarrageLength, barrageController.findBarrageLength)
router.post(api.user.login, userController.login)
router.post(api.message.addMessage, messageController.addMessage)
module.exports = router
