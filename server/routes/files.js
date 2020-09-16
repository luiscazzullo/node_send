const express = require('express');
const filesController = require('../controllers/filesController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/',
  filesController.uploadFile
)

router.get('/:file',
  filesController.download,
  filesController.deleteFile
)

module.exports = router;