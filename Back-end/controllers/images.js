const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const Image = require('../models/photo');

const multer = require('multer');

const express = require('express')

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//     let originalname = file.originalname;

//     let ext = originalname.split('.').pop();
//     let filename = originalname.split('.').slice(0, -1).join('.');

//     cb(null, filename + '-' + Date.now()+'.'+ext)
//   }
// })
 
// const upload = multer({ 
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if(file.mimetype =="image/png" || file.mimetype =="image/jpg" || file.mimetype =="image/jpeg" || file.mimetype =="image/gif" || file.mimetype =="image/tiff" || file.mimetype =="image/bmp" || file.mimetype =="image/ico") {
//       cb(null, true);
//     } else {
//       req.fileTypeValidationError = 'Only .png, .jpg, .jpeg, .ico, .gif, .tiff and .bmp format allowed!'
//       return cb(null, false, req.fileTypeValidationError);
//     }
//   }
// });

exports.upload = async (req, res, next) => {
    const payload = req.body;
    const filename = req.file.filename;
    console.log(filename);

  try {

    const image = new Image(payload, filename);

    Image.upload(payload, filename)
    
    res.status(200).json({ filename: filename });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// app.use(express.static('app'));
// app.use(cors())

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//     let originalname = file.originalname;

//     let ext = originalname.split('.').pop();
//     let filename = originalname.split('.').slice(0, -1).join('.');

//     cb(null, filename + '-' + Date.now()+'.'+ext)
//   }
// })
 
// var upload = multer({ 
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if(file.mimetype =="image/png" || file.mimetype =="image/jpg" || file.mimetype =="image/jpeg" || file.mimetype =="image/gif" || file.mimetype =="image/tiff" || file.mimetype =="image/bmp" || file.mimetype =="image/ico") {
//       cb(null, true);
//     } else {
//       req.fileTypeValidationError = 'Only .png, .jpg, .jpeg, .ico, .gif, .tiff and .bmp format allowed!'
//       return cb(null, false, req.fileTypeValidationError);
//     }
//   }
// });

// var server = app.listen(3001, function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log("File upload app listening at http://%s:%s", host, port)
// });

// app.post('/upload', upload.single('photo'), (req, res) => {
//   if(req.fileTypeValidationError) {
//     let resp = {
//       status: "fail",
//       statusMessage: req.fileTypeValidationError,
//       data: []
//     }
//   res.send({resp});
//   return false;
// }

// const payload = req.body;
// const filename = req.file.filename;