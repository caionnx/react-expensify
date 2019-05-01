const path = require('path')
const express = require('express')
const app = express()
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000

app.get('/offline.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'offline.html'))
})

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.join(publicPath, 'service-worker.js'))
})

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  next()
})

app.get('*.css', function (req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  res.set('Content-Type', 'text/css; charset=UTF-8')
  next()
})

app.use(express.static(publicPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
  console.log('Server is up!')
})
