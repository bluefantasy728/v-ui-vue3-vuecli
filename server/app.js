const express = require('express')
const multer = require('multer')
const uploade = multer({ dest: 'server/files/' })

const app = express()

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.send('upload success')
})

app.listen(3003)
