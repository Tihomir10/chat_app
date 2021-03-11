const express = require('express')
const router = express.Router()

const indexController = require('../controllers/indexController')

router.post('/register', indexController.user_create_post)

router.post('/login', indexController.user_login_post)

router.get('/chat', indexController.list_of_users_get)

module.exports = router