import jwt from 'jsonwebtoken';
require('dotenv').config();
import cloudinary from 'cloudinary';
import { cloudinaryConfig, errorResponseWithCloudinary } from '../util';

cloudinary.config(cloudinaryConfig);

class Authenticator {
  constructor() {
    this.key = process.env.SECRET_KEY;
    this.Verify = (req, res, next) => {
      const token = req.body.token || req.headers['x-token'] || req.query.token;
      if (!token) {
        return errorResponseWithCloudinary(req, res, 401, 'Unauthorized');
      }
      jwt.verify(token, this.key, (error, decoded) => {
        if (error) {
          const message = 'Token could not be authenticated';
          return errorResponseWithCloudinary(req, res, 403, message);
        }
        req.decoded = decoded;
        next();
      });
    };
  }
}
const authenticator = new Authenticator();
export default authenticator;
