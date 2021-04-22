const express = require('express')
const app = express()
const port = 3000
const expressHandlebars  = require('express-handlebars');


app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});


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