const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const jwt = require('jsonwebtoken');

// Connection URL
// const url = 'mongodb://localhost:27017';
const url = 'mongodb://184.172.214.162:30017'; // TODO: I Need to ENVify
const dbName = 'adaptive_cram';
var col;

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  col = client.db(dbName).collection('users');
});

function checkUserExistence(req, res, callback) {
  let authHeader = req.headers.authorization;
  if (authHeader.startsWith("Bearer ")){
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
        res.status(500).send('internal server error');
      } 
    });

    if (0 === items.length) {
      callback(false);
    } else {
      callback(true);
    }
  } else { // Raise error if token is invalid
    res.status(403).send('invalid token');
  }

}