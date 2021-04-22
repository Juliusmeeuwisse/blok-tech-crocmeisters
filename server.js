const express = require('express')
const app = express()
const port = 3000

const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");


app.get('/', (req, res) => {
  res.send('<h1> Welcome {name} <h1/>')
  console.log(template({ name: "joeri" }));
})

app.get('/settings', (req, res) => {
    res.send('settings')
  })


app.get('/myprofile', (req, res) => {
    res.send('my profile')

})


app.use(function (req, res, next) {
    res.status(404).send("404 Page not found")
  })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})