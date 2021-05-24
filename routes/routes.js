const express = require('express')
const usersController = require('../controllers/usersController')
const matchDataController = require('../controllers/matchDataController')
const profileAndSettingsController = require('../controllers/profileAndSettingsController')

const router = express.Router()

// routes
router.get('/', usersController.usersIndex)
router.post('/', usersController.likeAndMatch)
router.get('/match', matchDataController.getMatches)
router.get('/musiclist', matchDataController.getSongsForMusicList)
router.get('/profile', profileAndSettingsController.getProfile)
router.get('/settings', profileAndSettingsController.getSettings)

module.exports = router
