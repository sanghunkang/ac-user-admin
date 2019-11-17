const express = require('express');
const subroutines = require('./subroutines')

// Initialisations
const router  = express.Router();

/* Routes */
router.get('/signin', function (req, res, next) {
  subroutines.decodeToken(req)
  .then(profile => subroutines.findUser(profile))
  .then(user => {
    if (user === null) {
      console.log('No account found');
      res.status(200).send({ user: null });
    } else {
      console.log('Authorization successful');
      res.status(200).send({ user: user });
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ message: 'internal server error' });
  });
});

router.get('/signout', function (req, res, next) {
  // Some actions to clear session
});

router.post('/deleteAccount', function (req, res, next) {
  // Some actions to delete account
});

router.post('/signup', function (req, res, next) {
  console.log(req.body.username)
  let username = req.body.username;


  subroutines.decodeToken(req) // How to add post params?
  .then(profile => subroutines.findExistingUsername(profile, username))
  .then(user => subroutines.addUser(user))
  .catch(err => {
    console.log(err)
    res.status(500).send({ message: 'internal server error' });
  });
});

module.exports = router;
