const express = require('express')
const path = require('path')
const usersController = require('../controllers/usersController')
const matchDataController = require('../controllers/matchDataController')
const profileAndSettingsController = require('../controllers/profileAndSettingsController')
const loginController = require('../controllers/loginController')

const router = express.Router()

// Spotify authentication routes
router
  .get('/', loginController.getLogin)
  .get('/login', loginController.redirectToSpotifyLogin)
  .get('/callback', loginController.setAccestokens)

// routes
  .get('/main', usersController.checkSession, usersController.usersIndex)
  .post('/main', usersController.checkSession, usersController.likeAndMatch)
  .get('/match', usersController.checkSession, matchDataController.getMatches)
  .get('/musiclist', usersController.checkSession, matchDataController.getSongsForMusicList)
  .get('/profile', usersController.checkSession, profileAndSettingsController.getProfile)
  .get('/settings', usersController.checkSession, profileAndSettingsController.getSettings)
  .get('/confirmProfile', usersController.checkSession, loginController.getConfirmProfileData)
  .post('/confirmProfile', usersController.checkSession, loginController.confirmProfile)
  .post('/profile', usersController.checkSession, profileAndSettingsController.searchSongs)
  .get('/getDelete', usersController.checkSession, loginController.getDelete)
  .post('/getRemove', usersController.checkSession, loginController.remove)

module.exports = router
