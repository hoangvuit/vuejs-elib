const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bookSchema = new Schema({
  isbn: { type: String },
  title: { type: String },
  author: { type: String },
  cover: { type: String },
  description: { type: String },
  reviews: { type: Array },
  publisher: { type: String },
  copies: { type: Number, default: 1 }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
