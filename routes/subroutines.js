const jwt = require('jsonwebtoken');
const db = require('../db');

function decodeToken(req) {
  return new Promise((resolve, reject) => {
    let authHeader = req.get('Authorization');
      
    if (authHeader.startsWith("Bearer ")){
      let encodedToken = authHeader.substring(7, authHeader.length);
      let decodedToken = jwt.decode(encodedToken);
      // TODO: Check signature

      // TODO: Check expiration

      // If token is from google
      console.log(decodedToken);
      let profile = {
        email: decodedToken.email,
        provider: decodedToken.iss,
      }
      resolve(profile);
    } else {
      reject('Invalid token')
    }
  })
}

function findUser(profile) {
  return new Promise((resolve, reject) => {
    // The combinatino of email and provider is the unique identifier for users
    let findQuery = {
      email: profile.email,
      provider: profile.provider,
    }

    db.get().collection('users').find(findQuery).toArray(function(err, results) {
      if (err) { reject(err) };

      console.log(results)
      if (results.length === 0) {
        resolve(null);   
      } else if (results.length === 1){
        resolve(results[0]);
      } else {
        reject('Duplicate users');
      }
    });
  });
}

function findExistingUsername(profile, username) {
  return new Promise((resolve, reject) => {
    let findQuery = {
      username: username,
      // email: profile.email,
      // provider: profile.iss,
    }

    db.get().collection('users').find(findQuery, (err, r) => {
      if (err) { reject(err) };

      if (0 < results.length) {
        reject('Username already exists');
      } else {
        resolve({
          username: username,
          email: profile.email,
          provider: profile.iss,
          plan: 'free',
        });   
      }
    });
  });
}


function addUser(user) {
  return new Promise((resolve, reject) => {
    let insertQuery = {
      username: user.username,
      email: user.email,
      provider: user.iss,
      plan: user.plan,
    }

    db.get().collection('users').insertOne(insertQuery, (err, r)=> {
      if (err) { reject(err) };

      console.log(r);
      resolve('Succesully created new user');
    });
  });
}

function changePlan(plan, userInfo) {
  return new Promise((resolve, reject)=> {
    let updateQuery = {
      username: decoded.name,
      email: decoded.email,
      provider: decoded.iss,
      plan: req.params,
    }

    if (0 == items.length) {
      col.updateOne(insertQuery, ()=> {
        res.status(201).send({'created': true});
      });
    }
  })
}

module.exports = {
  decodeToken,
  findUser,
  findExistingUsername,
  addUser,
  changePlan,
}