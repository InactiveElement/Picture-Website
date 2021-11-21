const express = require('express');

const { body } = require('express-validator');

const router = express.Router()

const multer = require('multer')

const Image = require('../models/photo');

const imageController = require('../controllers/images');
const { application } = require('express');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      let originalname = file.originalname;
        
      let ext = originalname.split('.').pop();
      let filename = originalname.split('.').slice(0, -1).join('.');
  
      cb(null, filename + '-' + Date.now()+'.'+ext)
    }
  });
   
  var upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      if(file.mimetype =="image/png" || file.mimetype =="image/jpg" || file.mimetype =="image/jpeg" || file.mimetype =="image/gif" || file.mimetype =="image/tiff" || file.mimetype =="image/bmp" || file.mimetype =="image/ico") {
          cb(null, true);
      } else {
          
        req.fileTypeValidationError = 'Only .png, .jpg, .jpeg, .ico, .gif, .tiff and .bmp format allowed!'
        return cb(null, false, req.fileTypeValidationError);
      }
    } 
  }).single('photo');

router.post('/upload', upload, imageController.upload);

router.post('/display', imageController.display);

router.post('/delete', imageController.delete);

router.post('/update', imageController.update);



module.exports = router;