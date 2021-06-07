const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const nano = require('cssnano')
const nanoOpts = {}
const cssSize = require('css-size')
const css = 'h1 {\n  color: black;\n}\n'

function process (css, options) {
  return postcss([autoprefixer, nano(options)]).process(css)
}
cssSize(css, nanoOpts, process).then(function (results) {
  console.log(results)
})
