const express = require('express')
const usersController = require('../controllers/usersController')

const router = express.Router()

// routes
router.get('/', usersController.usersIndex)
router.post('/', usersController.likeAndMatch)

module.exports = router
