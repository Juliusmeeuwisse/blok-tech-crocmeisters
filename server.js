/* eslint-disable no-unused-vars */
require('dotenv').config()

// import dependecies
const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const path = require('path')

const indexRoutes = require('./src/routes/routes')

const { v4: uuidv4 } = require('uuid')

const session = require('express-session')
const app = express()

const port = process.env.PORT || 3000
const url = process.env.DB_URL

// set view engine
app
  .set('view engine', 'hbs')
  .set('views', 'src/views')
  .engine('hbs', handlebars({ extname: 'hbs' }))

  // sessions
  .use(session({
    name: 'user',
    secret: 'mySecret', // moet nog dotEnv worden
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 10000
    }
  }))

  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static('public'))
  .use(indexRoutes)

// Connection with database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port, console.log('Server running!🎉')))
  .catch((err) => console.log(err))

app.use((req, res, next) => {
  res.status(404).send('404 Page not found')
})
