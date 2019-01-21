const mongoose = require('mongoose')
const Schema = mongoose.Schema

let borrowSchema = new Schema({
  isbn: { type: String },
  userId: { type: String },
  return: { type: String }
})

const Borrow = mongoose.model('Borrows', borrowSchema)

module.exports = Borrow
