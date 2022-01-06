const path = require('path')
const express = require('express')
const cors = require('cors')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/upload/')
  },
  filename: (req, file, cb) => {
    var singfileArray = file.originalname.split('.')
    var fileExtension = singfileArray[singfileArray.length - 1]
    cb(null, singfileArray[0] + '-' + Date.now() + '.' + fileExtension)
    console.log(file)
  },
})

const upload = multer({ storage })

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'upload')))

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.send({
    filename: req.file.filename,
    size: req.file.size,
    type: req.file.mimetype,
  })
})

app.listen(3003)
