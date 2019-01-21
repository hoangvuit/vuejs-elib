const express = require('express')
const app = express()
const cors = require('cors')
const api = require('./api')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const multer = require('multer')
const uploadPath = '../public/uploads'

app.set('port', process.env.PORT || 8081)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', api)
app.use(express.static('static'))

app.use(morgan('dev'))

const multerConfig = {
  storage: multer.diskStorage({
    destination: function(req, file, next) {
      next(null, uploadPath)
    },

    filename: function(req, file, next) {
      const ext = file.mimetype.split('/')[1]
      next(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
  }),

  //A means of ensuring only images are uploaded.
  fileFilter: function(req, file, next) {
    if (!file) {
      next()
    }
    const image = file.mimetype.startsWith('image/')
    if (image) {
      console.log('photo uploaded')
      next(null, true)
    } else {
      console.log('file not supported')

      //TODO:  A better message response to user on failure.
      return next()
    }
  }
}
app.post('/api/upload', multer(multerConfig).single('cover'), function(
  req,
  res
) {
  const filename = req.file.filename
  res.send('/uploads/' + filename)
})

app.use(function(req, res) {
  const err = new Error('Not found')
  err.status = 404
  res.json(err)
})

app.use('/', express.static(__dirname + '/public'))

const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://localhost:27017/elib',
  { useNewUrlParser: true }
)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
  console.log('Connected to MongoDB')

  app.listen(app.get('port'), function() {
    console.log('API server listening on port ' + app.get('port'))
  })
})
