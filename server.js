/* eslint-disable no-unused-vars */
require('dotenv').config()

// import dependecies
const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const timeout = require('connect-timeout')

const indexRoutes = require('./src/routes/routes')

// const { v4: uuidv4 } = require('uuid')

const app = express()

const port = process.env.PORT || 3000
const url = process.env.DB_URL

// set viewport
app
  .set('view engine', 'hbs')
  .set('views', 'src/views')
  .engine('hbs', handlebars({ extname: 'hbs' }))

  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static('public'))
  .use(session({ secret: 'test' }))
  .use(indexRoutes)
  .use(timeout('5s'))

app.post('/save', timeout('5s'), haltOnTimedout, function (req, res, next) {
  savePost(req.body, function (err, id) {
    if (err) return next(err)
    if (req.timedout) return
    res.send('saved as id ' + id)
  })
})

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

function savePost (post, cb) {
  setTimeout(function () {
    cb(null, ((Math.random() * 40000) >>> 0))
  }, (Math.random() * 7000) >>> 0)
}

// Connection with database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port, console.log('Server running!🎉')))
  .catch((err) => console.log(err))

app.use(function (req, res, next) {
  res.status(404).send('404 Page not found')
})
