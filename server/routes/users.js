const express = require('express');
const userController = require('../controllers/userController');
const { check } = require('express-validator');

const router = express.Router();

router.post('/', 
[
  check('name', 'El nombre del usuario es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'Su contraseña debe poseer 8 caracteres como mínimo').isLength({ min: 8 })
],
userController.newUser);

module.exports = router;