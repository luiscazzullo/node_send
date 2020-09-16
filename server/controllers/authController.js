const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});
const { validationResult } = require('express-validator');

exports.authUser = async (req, res, next) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if(!user) {
    res.status(401).json({ msg: 'No se encontró el email' })
    return next();
  }

  if(bcrypt.compareSync(password, user.password)){
    const token = jwt.sign({
      name: user.name,
      id: user._id,
      email: user.email
    }, process.env.SECRET, {
      expiresIn: '8h'
    });
    res.json({ token });
  } else {
    res.status(401).json({ msg: 'El password no es correcto' });
    return next();
  }

}

exports.getAuthUser = (req, res, next) => {
  res.json({ user: req.user });
}