const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const jwt = require('jsonwebtoken');

var router = express.Router();


// Connection URL
// const url = 'mongodb://localhost:27017';
const url = 'mongodb://184.172.214.162:30017';
const dbName = 'adaptive_cram';
var col;

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  col = client.db(dbName).collection('users');
});

/* GET users listing. */

router.get('/signin', function(req, res, next) {
  // checkUserExistence(req, res, ()=> {
  //  if okay 
  // })



  let authHeader = req.headers.authorization;
  if (authHeader.startsWith("Bearer ")){ // Decode token if token is valid
    let token = authHeader.substring(7, authHeader.length);
    let decoded = jwt.decode(token);
  
    // Check if existing
    const findQuery = {
      'username': decoded.name,
      'email': decoded.email,
      'provider': decoded.iss,
    }
  
    col.find(findQuery).toArray(function(err, items) {
      console.log(items);
      if (err) {
        res.status(500).send({'some_key': 'internal server error'});
      } 
      
      let isFirstVisit = 0 == items.length
      
      // Create session
      // TO BE IMPLEMENTED

      res.status(200).send({
        'isFirstVisit': isFirstVisit
      });
    });
  } else { // Raise error if token is invalid
    res.status(403).send('invalid token');
  }
});

router.get('/signup', function(req, res, next) {
  let authHeader = req.headers.authorization;
  if (authHeader.startsWith("Bearer ")){ // Decode token if token is valid
    let token = authHeader.substring(7, authHeader.length);
    var decoded = jwt.decode(token);
  
    // Check if existing
    const findQuery = {
      'username': decoded.name,
      'email': decoded.email,
      'provider': decoded.iss,
    }
  
    col.find(findQuery).toArray(function(err, items) {
      console.log(items);
      if (err) {
        console.log(err);
        res.status(500).send('internal server error');
      }
       
      // Create new account
      const insertQuery = {
        'username': decoded.name,
        'email': decoded.email,
        'provider': decoded.iss,
        'plan': 'free',
      }
      
      if (0 == items.length) {
        console.log("problme if not there");
  
        col.insertOne(insertQuery, (err, r)=> {
          if (err) {
            console.log(err);
          }
          res.status(201).send({'created': true});
        });
      }
    });
  } else { // Raise error if token is invalid
    res.status(403).send('invalid token');
  }
});


router.get('/signout', function(req, res, next) {
  // delete session
  res.status(200).send('signed out');
});

module.exports = router;
