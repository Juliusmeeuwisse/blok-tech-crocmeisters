const express = require('express')
const app = express()
const port = 3000
const xhbs  = require('express-handlebars');


app.engine('handlebars', xhbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});



app.get('/login', (req, res) => {
    res.render('login')
  })


app.get('/match', (req, res) => {
    res.render('match')

})


app.use(function (req, res, next) {
    res.status(404).send("404 Page not found")
  })



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})