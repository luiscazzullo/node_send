const multer = require('multer');
const shortId = require('shortid');
const Links = require('../models/Links');
const fs = require('fs');


exports.uploadFile = async (req, res, next) => {

  const multerConfig = {
    limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + '/../uploads')
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, `${shortId.generate()}${extension}`);
      }
    })
  }

  const upload = multer(multerConfig).single('file');

  upload(req, res, async (error) => {
    if(!error) {
      res.json({ file: req.file.filename })
    } else {
      console.log(error);
      return next();
    }
  })
}

exports.deleteFile = async (req, res, next) =>  {
  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`)
  } catch (error) {
    console.log(error);
  }
}

exports.download = async (req, res, next) => {

  const { file } = req.params;
  const link = await Links.findOne({ name: file })
  
  const downloadFile = __dirname + '/../uploads/' + file;
  res.download(downloadFile);

  const { downloads, name } = link;

  if (downloads === 1) {
    req.file = name;
    await Links.findOneAndRemove(link.id);
    next();
  } else {
    link.downloads--;
    await link.save();
  }
}