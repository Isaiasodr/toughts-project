const express = require('express')
const router = express.Router()
const AuthController= require('../controllers/AuthController')

//controler
router.post('/login',AuthController.loginPost)
router.get('/login',AuthController.login)

router.get('/register',AuthController.register)

//função para flash message
router.post('/register',AuthController.registerPost)
router.get('/logout',AuthController.logout)


module.exports = router