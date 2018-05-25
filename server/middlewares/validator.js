﻿import cloudinary from 'cloudinary';
import { cloudinaryConfig, validationErrorMessage } from '../util';
import val from 'validator';
import { isArray } from 'util';

cloudinary.config(cloudinaryConfig);

class Validator {
  constructor(model, context) {
    this.model = model;
    this.context = context;
    this.verificationError = {};
    this.formatTime = this.formatTime.bind(this);
    this.verify = this.verify.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.isSentence = this.isSentence.bind(this);
    this.isNumberRange = this.isNumberRange.bind(this);
    this.verifyEvent = this.verifyEvent.bind(this);
    this.verifyCenter = this.verifyCenter.bind(this);
    this.verifyProfilePic = this.verifyProfilePic.bind(this);
    this.verifySignup = this.verifySignup.bind(this);
    this.verifySignin = this.verifySignin.bind(this);
    this.isJSON = this.isJSON.bind(this);
    this.verifyFacilities = this.verifyFacilities.bind(this);
  }
  // validate time using 24-hours format 00:00
  formatTime(time) {
    let result = false;
    const re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
    const m = time.match(re);
    if (m) {
      // tinary statement
      result = `${m[1].length === 2 ? '' : '0'}${m[1]}:${m[2]}`;
    }
    return result;
  }

  verify(req, res, next) {
    switch (this.model) {
      case 'events':
        this.verifyEvent(req, res, next);
        break;
      case 'centers':
        this.verifyCenter(req, res, next);
        break;
      case 'users':
        this.verifyUser(req, res, this.context, next);
        break;
      case 'facilities':
        this.verifyFacilities(req, res, next);
        break;
      default:
        break;
    }
  }

  verifyUser(req, res, context, next) {
    if (context === 'signup') {
      return this.verifySignup(req, res, next);
    } else if (context === 'signin') {
      return this.verifySignin(req, res, next);
    }
    return this.verifyProfilePic(req, res, next);
  }

  isSentence(input, min, max) {
    if (typeof input === 'string' && input.trim().length > min && input.length < max) {
      return true;
    }
    return undefined;
  }

  isNumberRange(input, max) {
    if (!isNaN(input) && parseInt(input, 10) < max) {
      return true;
    }
    return undefined;
  }

  verifyEvent(req, res, next) {
    const today = new Date();
    const { title, date, time, description, centerId } = req.body;
    // validate event title
    if (!this.isSentence(title, 3, 99)) {
      const message = 'Event title should be within 4-99 characters';
      this.verificationError = validationErrorMessage(message, res);
      // validate event date format: March 21, 2012
    } else if (isNaN(Date.parse(date)) || Date.parse(date) < Date.parse(today)) {
      this.verificationError = validationErrorMessage('Event has none or invalid date', res);
      // validate event time 24-hours format: 00:00
    } else if (!time || !this.formatTime(time)) {
      this.verificationError = validationErrorMessage('Event has none or invalid time', res);
      // validate event description
    } else if (!this.isSentence(description, 7, 254)) {
      const message = 'Event description should be within 8-254 characters';
      this.verificationError = validationErrorMessage(message, res);
      // validate centerId
    } else if (!this.isNumberRange(centerId, 2000000)) {
      this.verificationError = validationErrorMessage('Invalid center selected', res);
    } else {
      next();
      return this.verificationError;
    }
    cloudinary.v2.uploader.destroy(req.body.publicId);
    return this.verificationError;
  }

  verifyCenter(req, res, next) {
    // validate center name
    const { name, address, location, capacity, price, availability } = req.body;
    if (!this.isSentence(name, 3, 99)) {
      const message = 'Center name should be within 4-99 characters';
      this.verificationError = validationErrorMessage(message, res);
      // validate center address
    } else if (!this.isSentence(address, 3, 254)) {
      const message = 'Center address should be within 4-254 characters';
      this.verificationError = validationErrorMessage(message, res);
      // validate center location
    } else if (!this.isSentence(location, 3, 254)) {
      const message = 'Center location should be within 4-254 characters';
      this.verificationError = validationErrorMessage(message, res);
      // validate center capacity
    } else if (!this.isNumberRange(capacity, 2000000)) {
      const message = 'Center capacity should be number less 2m';
      this.verificationError = validationErrorMessage(message, res);
      // validate center price
    } else if (!this.isNumberRange(price, 2000000)) {
      const message = 'Center price should be number less 2m';
      this.verificationError = validationErrorMessage(message, res);
    } else if (!(availability === 'open' || availability === 'close')) {
      const message = 'Availability should be either [open] or [close]';
      this.verificationError = validationErrorMessage(message, res);
    } else {
      next();
      return this.verificationError;
    }
    cloudinary.v2.uploader.destroy(req.body.publicId);
    return this.verificationError;
  }

  verifyProfilePic(req, res, next) {
    const { picture, publicId } = req.body;
    if (typeof picture !== 'string' || !val.isURL(picture)) {
      this.verificationError = validationErrorMessage('Invalid Profile picture', res);
    } else if (!this.isSentence(publicId, 3, 254)) {
      this.verificationError = validationErrorMessage('Invalid public id', res);
    } else {
      next();
      return this.verificationError;
    }
    cloudinary.v2.uploader.destroy(req.body.publicId);
    return this.verificationError;
  }

  verifySignup(req, res, next) {
    // validate request username
    const { username, name, email, phoneNo, password, confirmPassword } = req.body;
    if (
      typeof username !== 'string' ||
      !val.isAlphanumeric(username) ||
      !val.isByteLength(username, 4, 99)
    ) {
      const message = 'Username should be alphanumeric within 4-99 characters';
      this.verificationError = validationErrorMessage(message, res);
      // validate request name
    } else if (!this.isSentence(name, 2, 99)) {
      const message = 'Full name should be string within 3-99 characters';
      this.verificationError = validationErrorMessage(message, res);
      // validate request email
    } else if (typeof email !== 'string' || !val.isEmail(email)) {
      const message = 'Non or Invalid email format';
      this.verificationError = validationErrorMessage(message, res);
      // validate request phone number
    } else if (
      typeof phoneNo !== 'string' ||
      !val.isMobilePhone(phoneNo, 'any', { strictMode: true })
    ) {
      const message = 'None or invalid phone no., include (+) and country code';
      this.verificationError = validationErrorMessage(message, res);
      // validate request password
    } else if (!this.isSentence(password, 5, 99)) {
      const message = 'Password should be within range: 6-99';
      this.verificationError = validationErrorMessage(message, res);
      // validate request confirm password
    } else if (!confirmPassword) {
      const message = 'Request has no confirmation password';
      this.verificationError = validationErrorMessage(message, res);
      // validate request password matching
    } else if (confirmPassword !== password) {
      this.verificationError = validationErrorMessage('Request passwords do not match', res);
    } else {
      next();
    }
    return this.verificationError;
  }

  verifySignin(req, res, next) {
    // validate request username
    const { username, password } = req.body;
    if (typeof username !== 'string' || !val.isAlphanumeric(username)) {
      const message = 'Username should be non-empty string';
      this.verificationError = validationErrorMessage(message, res);
      // validate request password
    } else if (!this.isSentence(password, 5, 99)) {
      const message = 'Password should be string not less than 6';
      this.verificationError = validationErrorMessage(message, res);
    } else {
      next();
    }
    return this.verificationError;
  }

  isJSON(data) {
    try {
      return typeof JSON.parse(data) === 'object';
    } catch (error) {
      return undefined;
    }
  }

  verifyFacilities(req, res, next) {
    const { data } = req.body;
    // TEST DATA: {"content":[{"name":"fish","spec":"golden","quantity":6}]}
    if (typeof data !== 'string' || !this.isJSON(data)) {
      this.verificationError = validationErrorMessage('Request is not valid json', res);
      return this.verificationError;
    } else if (!JSON.parse(data).content || !isArray(JSON.parse(data).content)) {
      this.verificationError = validationErrorMessage('Request does not contain valid data', res);
      return this.verificationError;
    }
    const facilityArray = JSON.parse(data).content;
    const facilityTable = [];
    facilityArray.some(item => {
      const name =
        typeof item.name === 'string' && item.name.trim().length > 1 ? item.name : undefined;
      const spec =
        typeof item.spec === 'string' && item.spec.trim().length > 1 ? item.spec : undefined;
      const quantity = !isNaN(item.quantity) ? item.quantity : undefined;
      if (name && spec && quantity) {
        facilityTable.push({ name, spec, quantity });
      } else {
        return true;
      }
    });
    if (facilityArray.length === facilityTable.length) {
      next();
    } else {
      this.verificationError = validationErrorMessage('Request contain invalid entry(s)', res);
      return this.verificationError;
    }
  }
}

export default Validator;
