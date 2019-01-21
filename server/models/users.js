const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: { type: String },
  fullname: { type: String },
  email: { type: String },
  id: { type: String }
})

const User = mongoose.model('Users', userSchema)

module.exports = User
