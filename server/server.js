const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const publicPath = path.join(__dirname, '..', 'public')
const generatedFilesPath = path.join(publicPath, 'dist')
const port = process.env.PORT || 3000

// Just a signal for development
app.listen(port, () => console.log(`Server is up on port ${port}`))

// Serving static files from dist because of routing via React
app.use(express.static(generatedFilesPath))

// CSS and JS compresssion
app.get(/.css$|.js$/, (req, res) => {
  const compressedFileUrl = `${req.url}.br`

  // Checking if file exist
  fs.stat(path.join(generatedFilesPath, compressedFileUrl), err => {
    // If the compression doesn't exists return the root path (e.g. install.js)
    if (err) {
      res.sendFile(path.join(publicPath, req.url))
      return
    }

    req.url = compressedFileUrl
    res.set('Content-Encoding', 'br')
    if (req.url.match(/.css/g)) res.set('Content-Type', 'text/css; charset=UTF-8')
    res.sendFile(path.join(generatedFilesPath, req.url))
  })
})

// Static files and all other routes
app.get('*', ({ url }, res) => {
  fs.stat(path.join(publicPath, url), err => {
    // If the file doesn't exists will return index for React router handling
    if (err) {
      res.sendFile(path.join(generatedFilesPath, 'index.html'))
      return
    }

    // Send static file(e.g. manifest.json)
    res.sendFile(path.join(publicPath, url))
  })
})
