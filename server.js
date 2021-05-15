/* eslint-disable no-unused-vars */

// import dependecies
const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('mongodb')
const request = require('request')
const path = require('path')
const handlebars = require('express-handlebars')
const { v4: uuidv4 } = require('uuid')
const { json } = require('body-parser')
require('dotenv').config()

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const matchBanner = '/images/banners/banner mmm-match.png'
const musicListBanner = '/images/banners/banner mmm-musiclist.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake it sessionID for now
const heartIcon = '/images/icons/white heart.png'

const app = express()
const port = process.env.PORT || 3000
const url = process.env.DB_URL
let users = null

// set viewport
app.set('view engine', 'hbs')
app.set('views', 'views')
app.engine('hbs', handlebars({ extname: 'hbs' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.listen(port, () => console.log('Server running!'))

// Connection with database
mongo.MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log(err)
  } else {
    users = client.db(process.env.DB_NAME).collection('users')
  }
})

// page templates
app.get('/', (req, res) => {
  users.find({}).toArray((err, profiles) => {
    if (err) {
      console.log(err)
    } else if (profiles === undefined) {
      res.render('home', {
        heartIcon,
        banner: mainBanner
      })
    } else {
      const myProfile = profiles.find((profile) => profile.id.includes(sessionID))
      const userProfiles = profiles.filter(
        (user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id)
      )
      const userProfile = userProfiles[0]
      // const randomUserProfile = userProfiles[Math.floor(Math.random() * userProfiles.length)];
      // console.log(userProfile);
      // console.log('🦧');
      res.render('home', {
        heartIcon,
        banner: mainBanner,
        userProfile
      })
    }
  })
})

app.post('/', (req, res) => {
  users.find({}).toArray((err, profiles) => {
    if (err) {
      console.log(err)
    } else {
      const myProfile = profiles.find((profile) => profile.id.includes(sessionID))
      const userProfiles = profiles.filter(
        (user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id)
      )
      const userProfile = userProfiles[0]
      // console.log(userProfile);
      // console.log('🌚');
      if (userProfile === undefined) {
        res.render('home', {
          banner: mainBanner,
          heartIcon
        })
      } else {
        const match = userProfile.likes.find((matches) => matches.includes(sessionID))
        if (req.body.like === 'true' && match) {
          users.updateOne(
            { id: sessionID },
            {
              $push: {
                matches: userProfile.id,
                likes: userProfile.id
              }
            },
            (err, res) => {
              if (err) {
                console.log(err)
              } else {
                console.log('MATCH🎉🥳🎉🥳🎉')
              }
            }
          )
        } else if (req.body.like === 'true') {
          users.updateOne({ id: sessionID }, { $push: { likes: userProfile.id } }, (err, res) => {
            if (err) {
              console.log(err)
            }
          })
        } else {
          users.updateOne({ id: sessionID }, { $push: { dislikes: userProfile.id } }, (err, res) => {
            if (err) {
              console.log(err)
            }
          })
        }
        res.render('home', {
          banner: mainBanner,
          heartIcon,
          userProfile
        })
      }
    }
  })
})

app.get('/musiclist', (req, res) => {
  users.find({}).toArray((err, profiles) => {
    if (err) {
      console.log(err)
    } else if (profiles === undefined) {
      res.render('musiclist', {
        heartIcon,
        banner: musicListBanner
      })
    } else {
      const myProfile = profiles.find((myProfile) => myProfile.id.includes(sessionID))
      const myMatches = profiles.filter((match) => myProfile.matches.includes(match.id))
      const mySongs = myMatches.map((song) => song.songs).flat()

      res.render('musiclist', {
        heartIcon,
        banner: musicListBanner,
        songs: mySongs
      })
    }
  })
})

app.get('/settings', (req, res) => {
  res.render('settings', {
    banner: mainBanner,
    heartIcon
  })
})

app.get('/profile', (req, res) => {
  res.render('profile', {
    banner: mainBanner,
    heartIcon
  })
})

app.get('/match', (req, res) => {
  users.find({}).toArray((err, profiles) => {
    if (err) {
      console.log(err)
    } else if (profiles === undefined) {
      res.render('match', {
        heartIcon,
        banner: matchBanner
      })
    } else {
      const myProfile = profiles.find((myProfile) => myProfile.id.includes(sessionID))
      const myMatches = profiles.filter((match) => myProfile.matches.includes(match.id))
      res.render('match', {
        heartIcon,
        banner: matchBanner,
        matches: myMatches
      })
    }
  })
})

app.use(function (req, res, next) {
  res.status(404).send('404 Page not found')
})
