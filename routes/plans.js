const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const jwt = require('jsonwebtoken');

const db = require('./db');

var router = express.Router();


// Connection URL
// const url = 'mongodb://localhost:27017';
const url = 'mongodb://184.172.214.162:30017'; // TODO: I Need to ENVify
const dbName = 'adaptive_cram';
var col;

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  col = client.db(dbName).collection('users');
});

router.post('/changePlan', function(req, res, next) {
  // Check session
  // To be implemented
  checkUserExistence(req, res, (ifUserExists) => {
    if (ifUserExists === true) {
      // Create new account
      const updateQuery = {
        'username': decoded.name,
        'email': decoded.email,
        'provider': decoded.iss,
        'plan': req.params,
      }

      if (0 == items.length) {
        col.updateOne(insertQuery, ()=> {
          res.status(201).send({'created': true});
        });
      }
    } else {
      res.status(500).send('user does not exist');
    }
  });
});

module.exports = router;