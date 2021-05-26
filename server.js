/* eslint-disable no-unused-vars */

// import dependecies
const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const path = require('path')
const cors = require('cors')
const request = require('request')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const indexRoutes = require('./src/routes/routes')
require('dotenv').config()

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
  .use(indexRoutes)

// Connection with database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port, console.log('Server running!🎉')))
  .catch((err) => console.log(err))

app.use(function (req, res, next) {
  res.status(404).send('404 Page not found')
})
