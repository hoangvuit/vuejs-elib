const User = require('../../models/users')

module.exports = function(router) {
  router.get('/user/:id', function(req, res) {
    User.findById(req.params.id)
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: 'Error finding user',
          error: err
        })
      )
  })

  router.get('/user/:email', function(req, res) {
    User.find({ email: req.params.email })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: 'Error finding user',
          error: err
        })
      )
  })

  router.post('/user', function(req, res) {
    let newUser = new User(req.body)
    var newUserData = {}
    newUserData = Object.assign(newUserData, newUser._doc)
    delete newUserData._id
    User.updateOne({ id: newUser.id }, newUserData, { upsert: true }, function(
      err,
      user
    ) {
      if (err) return console.log(err)
      res.status(200).json(user)
    })
  })
}
