const Book = require('../../models/books')

module.exports = function(router) {
  router.get('/book/:id', function(req, res) {
    Book.findById(req.params.id)
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: 'Error finding book',
          error: err
        })
      )
  })

  router.get('/book/isbn/:isbn', function(req, res) {
    Book.find({ isbn: req.params.isbn })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: 'Error finding book',
          error: err
        })
      )
  })

  router.patch('/book/:id', function(req, res) {
    const doc = {
      ...req.body
    }
    Book.updateOne({ _id: req.params.id }, { $set: doc }, function(err, raw) {
      if (err) {
        res.send(err)
      }
      res.send(raw)
    })
  })

  router.get('/books', function(req, res) {
    Book.find({})
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: 'Error finding book',
          error: err
        })
      )
  })

  router.post('/book', function(req, res) {
    let book = new Book(req.body)
    book.save(function(err, book) {
      if (err) return console.log(err)
      res.status(200).json(book)
    })
  })
}
