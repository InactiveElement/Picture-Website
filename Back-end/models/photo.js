const db = require('../util/database');

module.exports = class Image {
  constructor(payload, filename) {
      this.payload = payload;
      this.filename = filename;
  }

  static display(id) {
    return db.execute(
      `
      SELECT * FROM pictures WHERE id = '${id}'
      `
    );
  }

  static delete(photoID) {
    return db.execute(
      `DELETE FROM pictures WHERE picture_id = '${photoID}'`
    );
  }

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