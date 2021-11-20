// var express = require('express');
// var cors = require('cors')
// var app = express();
// var multer  = require('multer');
const db = require('../util/database');
// var upload = multer({ dest: 'uploads/' })


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

module.exports = class Image {
  constructor(payload, filename) {
      this.payload = payload;
      this.filename = filename;
  }

  // static findU(username) {
  //     return db.execute(
  //         'SELECT * FROM users WHERE username = ?', [username]);
  // }

  // static findE(email) {
  //     return db.execute(
  //         'SELECT * FROM users WHERE email = ?', [email]);
  // }

  static upload(payload, filename) {
      return db.execute(
        `
        INSERT INTO pictures (
          picture_name,
          geolocation,
          tags,
          capture_date,
          capture_by,
          id
        ) VALUES (
          '${filename}',
          '${payload.geolocation}',
          '${payload.tags}',
          '${payload.captureDate}',
          '${payload.captureBy}',
          '${payload.id}'
        )`
      );
  }
};

// const sql = `
// INSERT INTO pictures (
//   picture_data,
//   geolocation,
//   tags,
//   capture_date,
//   capture_by,
//   id
// ) VALUES (
//   '${filename}',
//   '${payload.geolocation}',
//   '${payload.tags}',
//   '${payload.capture_date}',
//   '${payload.capture_by}',
//   '${payload.id}'
// )`;
// console.query(sql, (err, rows) => {
//   if (err) throw err;
//   let resp = {
//     status: "success",
//     statusMessage: "",
//     data: rows
//   }
//   res.send(resp);
// });