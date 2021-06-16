// cssnano.config.js
module.exports = {
  from: 'public/css/style.css',
  plugins: [
    require('cssnano')({
      preset: 'default'
    })
  ]
}
