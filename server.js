/* eslint-disable no-unused-vars */

// import dependecies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const users = require('./models/users')
const { MongoClient } = require('mongodb')
const request = require('request')
const path = require('path')
const handlebars = require('express-handlebars')

const indexRoutes = require('./routes/indexRouter')
const musicListRoutes = require('./routes/musicListRouter')
const matchRouter = require('./routes/matchesRouter')
const settingsRouter = require('./routes/settingsRouter')
const profileRouter = require('./routes/profileRouter')
// const { v4: uuidv4 } = require('uuid')

require('dotenv').config()

const port = process.env.PORT || 3000
const url = process.env.DB_URL

// set viewport
app.set('view engine', 'hbs')
app.set('views', 'views')
app.engine('hbs', handlebars({ extname: 'hbs' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(indexRoutes)
app.use(musicListRoutes)
app.use(matchRouter)
app.use(settingsRouter)
app.use(profileRouter)

// Connection with database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port, console.log('Server running!🎉')))
  .catch((err) => console.log(err))

app.use(function (req, res, next) {
  res.status(404).send('404 Page not found')
})
