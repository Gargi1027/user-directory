const data = require('./model/data.js');

const express = require('express');
const app = express();
const path = require('path');

const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/returnRobots';
const assert = require('assert');

app.get('/', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
        console.warn("Error connecting to database!!!", err);
      }
      else{
        console.log("Successful connection")
      }
      const robots = db.collection("robots");
      // console.log(robots);
     let users = robots.find({}).toArray(function(err, hit) {
       if (err) {
           console.warn("Error finding data!!!", err);
         }
       res.render('indexUser', {users: hit});
   });
   db.close();
 });
});

app.get("/unemployed", function(req, res){
  MongoClient.connect(url, function(err, db) {
    if (err) {
        console.warn("Error connecting to database!!!", err);
      }
      else{
        console.log("Successful connection")
      }
      const robots = db.collection("robots");
      // console.log(robots);
     let users = robots.find({job:null}).toArray(function(err, hit) {
       if (err) {
           console.warn("Error finding data!!!", err);
         }
       res.render('unemployed', {users: hit});
   });
   db.close();
 });
});

  app.get("/employed", function(req, res){
    MongoClient.connect(url, function(err, db) {
      if (err) {
          console.warn("Error connecting to database!!!", err);
        }
        else{
          console.log("Successful connection")
        }
        const robots = db.collection("robots");
        // console.log(robots);
       let users = robots.find({job:{$ne:null}}).toArray(function(err, hit) {
         if (err) {
             console.warn("Error finding data!!!", err);
           }
         res.render('employed', {users: hit});
     });
     db.close();
   });
  });

app.get('/users/:id', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
        console.warn("Error connecting to database!!!", err);
      }
      else{
        console.log("Successful connection")
      }
      const robots = db.collection("robots");
      robots.findOne({id:req.params.id})
      .then(function(hit) {
          console.log(hit);
        // res.render('idUser', {hit});
    });
   db.close();
  });
});

app.listen(3000, function () {
  console.log('User directory successfully started!!!');
});
