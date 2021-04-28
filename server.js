// import dependecies
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const hbs = require('express-handlebars');


app.engine('handlebars', hbs({
  layoutsDir: __dirname + '/views/layouts',}));
// app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}))
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// app.get('/', function (req, res) {
//     res.render('home');
// });

app.get('/', (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render('home', {layout : 'main'});
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



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})