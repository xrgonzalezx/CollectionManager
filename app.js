const express = require('express');
const mongoClient = require('mongodb').mongoClient;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')
const booksSchema = require('./model/books.js')

//Create app instance for Express
const app = express();
//Connect to Mongo DB through Mongoose ('recipesdb' is a database name)
mongoose.connect('mongodb://localhost:27017/booksdb');

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));



// const Book = mongoose.model('Book', booksSchema);
// var aBook = new Book({title: "Searching"});
// // aBook.author.push({firstName: "Bob", lastName: "Spagz"});
// aBook.author.firstName = "Bob";
// aBook.author.lastName = "Spagz";
// // console.log(aBook.toObject()); use this to check the added recipe
//
//
// aBook.save().then(function (){
//   //actions after successful save
//   console.log('books saved');
// }).catch(function (){
//   //handle error
//   console.log('Mongo could not save books');
// });
