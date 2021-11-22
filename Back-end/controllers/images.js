const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const Image = require('../models/photo');

const multer = require('multer');

const express = require('express')

const router = express.Router();

const base64Img = require('base64-img');

exports.upload = async (req, res, next) => {

  try {
    const payload = req.body;
    var filename = req.file.filename;
    const image = new Image(payload, filename);

    base64Img.base64(__dirname + '\\..\\uploads\\' + filename, function(err, data) {
      filename = data;
      Image.upload(payload, filename) 
    }
    );
    
    res.status(200).json({ message: "Success" });

  } catch (err) {
      const error = new Error('Only .png, .jpg, .jpeg, .ico, .gif, .tiff and .bmp format allowed!')
      res.status(401).json({ message: error.message });
  }
}

exports.display = async (req, res, next) => {
  const id = req.body.id;
  try {
    const displaying = await Image.display(id)
    const storedValues = displaying[0][0];

    res.status(200).json({
      photoId: storedValues.picture_id,
      photo: storedValues.picture_name,
      geolocation: storedValues.geolocation,
      tags: storedValues.tags,
      capturedDate: storedValues.capture_date,
      capturedBy: storedValues.capture_by
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
 } 

 exports.update = async (req, res, next) => {
    const newData = req.body;
  try {
    const updating = await Image.update(newData)

    res.status(200).json({message: "Updated"})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
 }

 exports.delete = async (req, res, next) => {
  const photoID = req.body.photoID;
  try {
    const deleting = await Image.delete(photoID)

    res.status(200).json({ message: "Picture deleted." })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
 }

 exports.share = async (req, res, next) => {
  try {
    const shareDetails = req.body;
    const shared = await Image.share(shareDetails)

    res.status(200).json({ message: "Success" })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
 }

 exports.showShared = async (req, res, next) => {
   try {
     const currentUser = req.body.currentUser;
     const userReturn = await Image.showShared(currentUser)

     if (userReturn[0].length < 1) {
       const error = new Error("None");
       error.statusCode = 413;
       res.status(413).json({ message: error.message });
       throw error    
     }
     res.status(202).json({ 
      sharedPhoto: userReturn[0][0].picture_data,
      });

   } catch (err) {
     if (!err.statusCode) {
       err.statusCode = 500;
     }
     next(err);
   }
 }