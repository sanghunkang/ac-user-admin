const express = require('express');
const subroutines = require('./subroutines')

// Initialisations
const router  = express.Router();

/* Routes */
router.post('/change_plan', function (req, res, next) {
  subroutines.decodeToken(req)
  .then(findQuery => subroutines.findUser(findQuery))
  .then(plan => subroutines.changePlan())
  .catch(err => {
    console.log(err)
    res.status(500).send({ message: 'internal server error' });
  });
});



module.exports = router;