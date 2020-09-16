const express = require('express');
const linkController = require('../controllers/linkController');
const filesController = require('../controllers/filesController')
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/',
  [
    check('name', 'Sube un archivo').not().isEmpty(),
    check('original_name', 'Sube un archivo').not().isEmpty()
  ],
  auth,
  linkController.newLink
)

router.get('/',
  linkController.getAllLinks
)

router.get('/:url',
  linkController.hasPassword,
  linkController.getLink
)

router.post('/:url',
  linkController.verifyPassword,
  linkController.getLink
)

module.exports = router;