// import dependecies
const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', handlebars({extname: 'hbs'}))

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Server running!`)
})

app.get('/', (req, res) => {
  res.render('home');
  });



app.get('/login', (req, res) => {
    res.render('login');
  });


app.get('/match', (req, res) => {
    res.render('match');

});


app.use(function (req, res, next) {
    res.status(404).send("404 Page not found")
  })

 