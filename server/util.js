import cloudinary from 'cloudinary';
require('dotenv').config();

export const cloudinaryConfig = {
  cloud_name: 'eventmanager',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};
export const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
cloudinary.config(cloudinaryConfig);

export const restResponse = (res, status, statusCode, value) => {
  if (status === 'success') {
    return res.status(statusCode).json({ status: 'success', data: value });
  }
  return res.status(statusCode).json({ status: 'error', message: value });
};

export const errorResponseWithCloudinary = (req, res, errorCode, errorMessage) => {
  if (req.body.publicId) {
    cloudinary.v2.uploader.destroy(req.body.publicId);
    return restResponse(res, 'error', errorCode, errorMessage);
  }
  return restResponse(res, 'error', errorCode, errorMessage);
};

export const validationErrorMessage = (msg, res) => restResponse(res, 'err', 400, msg);

export let invalidParameter;
export const confirmParams = (req, res) => {
  if (isNaN(req.params.id)) {
    invalidParameter = validationErrorMessage('invalid parameter', res);
    return invalidParameter;
  }
  return true;
};
