import jwt from 'jsonwebtoken';
require('dotenv').config();
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'eventmanager',
  api_key: '789891965151338',
  api_secret: 'ynezeVbgUnGIfNYKj19GvyrflSI',
});

class Authenticator {
  constructor() {
    this.key = process.env.SECRET_KEY;
    this.Verify = (req, res, next) => {
      const token = req.body.token || req.headers['x-token'] || req.query.token;
      if (!token) {
        return cloudinary.v2.uploader.destroy(req.body.publicId, () =>
          res.status(401).json({ status: 'error', message: 'Unauthorized' })
        );
      }
      jwt.verify(token, this.key, (error, decoded) => {
        if (error) {
          return cloudinary.v2.uploader.destroy(req.body.publicId, () =>
            res.status(403).json({
              status: 'error',
              message: 'Token could not be authenticated',
            })
          );
        }
        req.decoded = decoded;
        next();
      });
    };
  }
}
const authenticator = new Authenticator();
export default authenticator;
