const path = require('path')
const express = require('express')
const app = express()
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000

// Just a signal for development
app.listen(port, () => console.log('Server is up!'))

// Handle css and js extension (Because of Brotli compression)
function handleVendorsCompress (req, res, next) {
  req.url = req.url + '.br'
  res.set('Content-Encoding', 'br')
  if (req.url.match(/.css/g)) res.set('Content-Type', 'text/css; charset=UTF-8')
  next()
}
app.get('*.css', handleVendorsCompress)
app.get('*.js', handleVendorsCompress)

// Handle all routing and root middleware
app.use(express.static(path.join(publicPath, 'dist/')))
app.get('*', ({ url }, res) => {
  let fromPublic = false

  if (
    url.match(/\/images\//) ||
    url.match(/\/manifest.json/) ||
    url.match(/\/install.js/) ||
    url.match(/\/service-worker.js/) ||
    url.match(/\/offline.html/)
  ) fromPublic = true

  if (fromPublic) {
    res.sendFile(path.join(publicPath, url))
  } else {
    res.sendFile(path.join(publicPath, 'dist', 'index.html'))
  }
})
