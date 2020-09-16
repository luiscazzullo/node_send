const express = require('express');
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', 
[
  check('email', 'El email no es válido').isEmail(),
  check('password', 'El password no puede ir vacío').not().isEmpty()
],
authController.authUser);

router.get('/', 
  auth,
  authController.getAuthUser
);

module.exports = router;