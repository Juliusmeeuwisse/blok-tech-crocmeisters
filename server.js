const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('welcome')
})

app.get('/signUp', (req, res) => {
    res.send('time to create a profile')
  })


app.get('/myprofile', (req, res) => {
    res.send('my profile')
})

app.use(function (req, res, next) {
    res.status(404).send("Page not found")
  })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})