const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')


//Create app instance for Express
const app = express();
//Connect to Mongo DB through Mongoose ('recipesdb' is a database name)
mongoose.connect('mongodb://localhost:27017/booksdb');

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

const booksSchema = new mongoose.Schema({
  title: {type: String, required: true, unique:true},
  pages: Number,
  author: String,
  genre: [{ type: String, lowrcase: true }],
  synopsis: String,
  format: { type: String, lowercase: true, default: 'book' }
});



const Book = mongoose.model('Book', booksSchema);
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
// }).catch(function (e){
//   //handle error
//   console.log('Mongo could not save books', e);
// });

app.get('/', function (request, response){
  Book.find().then (function (books){
    response.render('booksindex', { booksdata: books })
  }).catch (function(e){
    console.log(e);
  });
})


app.post('/', function (request, response){
  Book.find().then (function (books){
    let book = new Book({
        title: request.body.title,
      genre: request.body.genre,
      pages: request.body.pages,
      synopsis: request.body.synopsis,
      author: request.body.author,
      format: request.body.format
    });
    response.render('booksindex', { booksdata: books })
    book.save().then(function () {
      console.log('books saved');

  }).catch (function(e){
    console.log(e);
  });
})
})

// .catch(function (e) {
// console.log('Mongo could not save books', e);
// })
// })

app.listen(3000, function () {
    console.log('listening on port 3000');
});
