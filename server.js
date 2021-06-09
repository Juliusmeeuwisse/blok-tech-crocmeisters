/* eslint-disable no-unused-vars */
require('dotenv').config()

// import dependecies
const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const path = require('path')
const session = require('express-session')

const indexRoutes = require('./src/routes/routes')

// const { v4: uuidv4 } = require('uuid')

const app = express()

const port = process.env.PORT || 3000
const url = process.env.DB_URL

// set view engine
app
  .set('view engine', 'hbs')
  .set('views', 'src/views')
  .engine('hbs', handlebars({ extname: 'hbs' }))

  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static('public'))
  .use(indexRoutes)

  // sessions
  .use(session({
    resave: false, // checked session docs, false is best option(for now)
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  }))

const setLocals = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user
    res.locals.notification = false
    next()
  } else {
    console.log(req.session)
    res.locals.user = false
    res.locals.notification = false
    next()
  }
}

// Connection with database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port, console.log('Server running!🎉')))
  .catch((err) => console.log(err))

app.use((req, res, next) => {
  res.status(404).send('404 Page not found')
})
