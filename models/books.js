const mongoose = require('mongoose');


const booksSchema = new mongoose.Schema({
  title: {type: String, required: true, unique:true},
  pages: Number,
  author: {firstName: String, lastName: String },
  isbn: { type: Number, unique: true },
  genre: [{ type: String, lowrcase: true }],
  synopsis: String,
  format: { type: String, lowercase: true, default: 'book' }
});

module.exports = booksSchema;
