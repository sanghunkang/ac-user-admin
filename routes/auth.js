const express = require('express');
const jwt = require('jsonwebtoken');

const router  = express.Router();

/* POST login. */
router.get('/', function (req, res, next) {
  
  try {

    let authHeader = req.get('Authorization');
    
    if (authHeader.startsWith("Bearer ")){
      let encodedToken = authHeader.substring(7, authHeader.length);
      console.log(encodedToken);
      let decodedToken = jwt.decode(encodedToken); // jwt.sign(encodedToken); //{ foo: 'bar' }, 
      console.log(decodedToken);
      
      res.status(400).json({
        message: 'Something is not right',
        user   : 'test'
      });
      
    } else {
      res.status(400).json({
        message: 'Something is not right',
        user   : 'test'
      });
    }




  } catch (err) {
    console.log(err);
    res.status(500);
  }
  // passport.authenticate('local', {session: false}, (err, user, info) => {
  //   if (err || !user) {
  //       return res.status(400).json({
  //           message: 'Something is not right',
  //           user   : user
  //       });
  //   }
  //   req.login(user, {session: false}, (err) => {
  //       if (err) {
  //           res.send(err);
  //       }
  //       // generate a signed son web token with the contents of user object and return it in the response
  //       const token = jwt.sign(user, 'your_jwt_secret');
  //       return res.json({user, token});
  //   });
  // })(req, res);
});

module.exports = router;
