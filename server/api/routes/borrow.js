const Borrow = require('../../models/borrows')
const User = require('../../models/users')

module.exports = function(router) {
  router.get('/borrow/:id', function(req, res) {
    Borrow.findById(req.params.id)
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: 'Error finding borrow',
          error: err
        })
      )
  })

  router.get('/borrows', function(req, res) {
    Borrow.find()
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: 'Error finding borrow',
          error: err
        })
      )
  })

  router.get('/borrow/book/:isbn', function(req, res) {
    Borrow.find({ isbn: req.params.isbn })
      .exec()
      .then(docs => {
        const userIds = []
        docs.forEach(d => {
          if (d.return === undefined) userIds.push(d.userId)
        })
        User.find({ id: { $in: userIds } })
          .exec()
          .then(docs => {
            const borrows = docs.map(d => d.fullname)
            res.status(200).json(borrows)
          })
      })
      .catch(err =>
        res.status(500).json({
          message: 'Error finding borrow',
          error: err
        })
      )
  })

  router.patch('/borrow/:id', function(req, res) {
    const doc = {
      ...req.body
    }
    Borrow.updateOne({ _id: req.params.id }, { $set: doc }, function(err) {
      if (err) {
        res.send(err)
      }
      Borrow.findById(req.params.id)
        .exec()
        .then(docs => res.status(200).json(docs))
        .catch(err =>
          res.status(500).json({
            message: 'Error finding borrow',
            error: err
          })
        )
    })
  })

  router.post('/borrow', function(req, res) {
    let borrow = new Borrow(req.body)
    borrow.save(function(err, borrow) {
      if (err) return console.log(err)
      res.status(200).json(borrow)
    })
  })
}
