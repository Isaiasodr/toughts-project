const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')
//helpers
const checkAuth = require("../helpers/auth").checkAuth

//controler
router.get('/add', checkAuth, ToughtController.createTougths)
router.post('/add', checkAuth, ToughtController.createTougthsSave)
router.get('/edit/:id', checkAuth, ToughtController.editToughts)
router.post('/edit', checkAuth, ToughtController.editToughtsSave)



router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.post('/remove', checkAuth, ToughtController.removetoughts)

router.get('/', ToughtController.showToughts)


module.exports = router