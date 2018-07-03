import cloudinary from 'cloudinary';
require('dotenv').config();
import bcrypt from 'bcryptjs';

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

export function compareCenters(req, res, centersToCompare, nextAction) {
  const { name, location, address } = req.body;
  let sameCenter;
  if (centersToCompare.length !== 0) {
    centersToCompare.forEach(center => {
      if (center.name === name && center.location === location && center.address === address) {
        sameCenter = 'Same center already exists';
      }
    });
  }
  if (sameCenter) {
    return errorResponseWithCloudinary(req, res, 409, sameCenter);
  }
  return nextAction();
}

export function centerEntry(req) {
  const { body, decoded } = req;
  return {
    name: body.name,
    address: body.address,
    location: body.location,
    availability: body.availability,
    picture: body.picture,
    publicId: body.publicId,
    userId: decoded.id,
    capacity: parseInt(body.capacity, 10),
    price: parseInt(body.price, 10),
  };
}

export function eventEntry(req, timestamp) {
  const { body, decoded } = req;
  return {
    title: body.title,
    date: timestamp,
    description: body.description,
    picture: body.picture,
    publicId: body.publicId,
    userId: decoded.id,
    centerId: body.centerId,
  };
}
export function userEntry(req) {
  const { username, name, email, phoneNo, company, website, address, password } = req.body;
  return {
    username,
    name,
    email,
    phoneNo,
    company,
    website,
    address,
    password: bcrypt.hashSync(password, 10),
  };
}
export function checkAvailability(req, res, timestamp, events) {
  const day = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = timestamp.getFullYear();
  const occupiedDates = new Set();
  let errorMessage;
  events.forEach(event => {
    const eventDate = event.date;
    const eventDay = eventDate.getDate();
    const eventMonth = eventDate.getMonth();
    const eventYear = eventDate.getFullYear();
    const eventStatus = event.status;
    occupiedDates.add(new Date(eventDate).toDateString());
    if (
      eventStatus !== 'rejected' &&
      eventDay === day &&
      eventMonth === month &&
      eventYear === year
    ) {
      // forbidden
      errorMessage = {
        Sorry: 'Selected date is already occupied for selected center',
        OccupiedDates: Array.from(occupiedDates),
      };
    }
  });
  if (errorMessage) {
    return errorResponseWithCloudinary(req, res, 409, errorMessage);
  }
  return true;
}
