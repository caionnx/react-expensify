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

function sendFile ({ url }, res) {
  const finalUrl = path.join(publicPath, url)
  return res.sendFile(finalUrl)
}

app.get('*.css', handleVendorsCompress)
app.get('/service-worker.js', sendFile) // Exception of .js file
app.get('*.js', handleVendorsCompress)

// Handle all routing and root middleware
app.use(express.static(path.join(publicPath, 'dist/')))
app.get('*', ({ url }, res) => {
  let finalUrl = url

  if (
    !url.match(
      /(\/images\/)|(\/manifest.json)|(\/install.js)|(\/offline.html)/
    )
  ) finalUrl = path.join('dist', 'index.html')

  sendFile({ url: finalUrl }, res)
})
