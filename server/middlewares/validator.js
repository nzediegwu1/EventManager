import cloudinary from 'cloudinary';
import { cloudinaryConfig, validationErrorMessage } from '../util';
import val from 'validator';
import { isArray } from 'util';

cloudinary.config(cloudinaryConfig);

class Validator {
  constructor(model, context) {
    this.model = model;
    this.context = context;
    this.verificationError = {};
  }
  // validate time using 24-hours format 00:00
  formatTime = time => {
    let result = false;
    const re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
    const m = time.match(re);
    if (m) {
      result = `${m[1].length === 2 ? '' : '0'}${m[1]}:${m[2]}`;
    }
    return result;
  };

  isValidUsername = input => {
    const regex = /^[-\w\.\$\@]{1,30}$/;
    if (input.match(regex)) return true;
    return undefined;
  };

  verify = (req, res, next) => {
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
      case 'approval':
        this.verifyApproval(req, res, next);
        break;
      default:
        break;
    }
  };

  verifyUser = (req, res, context, next) => {
    if (context === 'signup') {
      return this.verifySignup(req, res, next);
    } else if (context === 'signin') {
      return this.verifySignin(req, res, next);
    }
    return this.verifyProfilePic(req, res, next);
  };

  isSentence = (input, min, max) => {
    if (typeof input === 'string' && input.trim().length > min && input.length < max) {
      return true;
    }
    return undefined;
  };

  isNumberRange = (input, max) => {
    if (!isNaN(input) && parseInt(input, 10) < max) {
      return true;
    }
    return undefined;
  };

  verifyApproval = (req, res, next) => {
    const { status } = req.body;
    if (!(status === 'approved' || status === 'rejected')) {
      const message = 'Status should be [approved] or [rejected]';
      this.verificationError = validationErrorMessage(message, res);
    } else {
      next();
      return this.verificationError;
    }
    return this.verificationError;
  };

  verifyEvent = (req, res, next) => {
    const today = new Date();
    const { title, date, time, description, centerId, publicId } = req.body;
    if (!this.isSentence(title, 3, 99)) {
      const message = 'Event title should be within 4-99 characters';
      this.verificationError = validationErrorMessage(message, res);
      // EXAMPLE: July 17, 2018
    } else if (isNaN(Date.parse(date)) || Date.parse(date) < Date.parse(today)) {
      this.verificationError = validationErrorMessage('Event has none or invalid date', res);
    } else if (!time || !this.formatTime(time)) {
      this.verificationError = validationErrorMessage('Event has none or invalid time', res);
    } else if (!this.isSentence(description, 7, 254)) {
      const message = 'Event description should be within 8-254 characters';
      this.verificationError = validationErrorMessage(message, res);
    } else if (!this.isNumberRange(centerId, 2000000)) {
      this.verificationError = validationErrorMessage('Invalid center selected', res);
    } else {
      next();
      return this.verificationError;
    }
    cloudinary.v2.uploader.destroy(publicId);
    return this.verificationError;
  };

  verifyCenter = (req, res, next) => {
    // validate center name
    const { name, address, location, capacity, price, availability, publicId } = req.body;
    if (!this.isSentence(name, 3, 99)) {
      const message = 'Center name should be within 4-99 characters';
      this.verificationError = validationErrorMessage(message, res);
    } else if (!this.isSentence(address, 3, 254)) {
      const message = 'Center address should be within 4-254 characters';
      this.verificationError = validationErrorMessage(message, res);
    } else if (!this.isSentence(location, 3, 254)) {
      const message = 'Center location should be within 4-254 characters';
      this.verificationError = validationErrorMessage(message, res);
    } else if (!this.isNumberRange(capacity, 2000000)) {
      const message = 'Center capacity should be number less 2m';
      this.verificationError = validationErrorMessage(message, res);
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
    cloudinary.v2.uploader.destroy(publicId);
    return this.verificationError;
  };

  validateImage = (picture, publicId) => {
    if (typeof picture !== 'string' || !val.isURL(picture)) {
      return 'Invalid picture';
    } else if (!this.isSentence(publicId, 3, 254)) {
      return 'Invalid public id';
    }
    return true;
  };

  verifyProfilePic = (req, res, next) => {
    const { picture, publicId } = req.body;
    const result = this.validateImage(picture, publicId);
    if (result !== true) {
      this.verificationError = validationErrorMessage(result, res);
    } else {
      next();
      return this.verificationError;
    }
    cloudinary.v2.uploader.destroy(publicId);
    return this.verificationError;
  };

  verifySignup = (req, res, next) => {
    const { username, name, email, phoneNo, password, confirmPassword } = req.body;
    let message;
    if (typeof username !== 'string' || !this.isValidUsername(username)) {
      message = 'Username should be alphanumeric and less than 30 characters (no special chars)';
      this.verificationError = validationErrorMessage(message, res);
    } else if (!this.isSentence(name, 2, 99)) {
      message = 'Full name should be string within 3-99 characters';
      this.verificationError = validationErrorMessage(message, res);
    } else if (typeof email !== 'string' || !val.isEmail(email)) {
      message = 'Non or Invalid email format';
      this.verificationError = validationErrorMessage(message, res);
    } else if (
      typeof phoneNo !== 'string' ||
      !val.isMobilePhone(phoneNo, 'any', { strictMode: true })
    ) {
      message = 'None or invalid phone no., include (+) and country code';
      this.verificationError = validationErrorMessage(message, res);
    } else if (!this.isSentence(password, 5, 99)) {
      message = 'Password should be within range: 6-99';
      this.verificationError = validationErrorMessage(message, res);
    } else if (!confirmPassword) {
      message = 'Request has no confirmation password';
      this.verificationError = validationErrorMessage(message, res);
    } else if (confirmPassword !== password) {
      this.verificationError = validationErrorMessage('Request passwords do not match', res);
    } else {
      next();
    }
    return this.verificationError;
  };

  verifySignin = (req, res, next) => {
    const { username, password } = req.body;
    if (typeof username !== 'string' || !this.isValidUsername(username)) {
      const message =
        'Username should be alphanumeric and less than 30 characters (no special chars)';
      this.verificationError = validationErrorMessage(message, res);
    } else if (!this.isSentence(password, 5, 99)) {
      const message = 'Password should be string not less than 6';
      this.verificationError = validationErrorMessage(message, res);
    } else {
      next();
    }
    return this.verificationError;
  };

  isJSON = data => {
    try {
      return typeof JSON.parse(data) === 'object';
    } catch (error) {
      return undefined;
    }
  };

  verifyFacilities = (req, res, next) => {
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
    function parsedField(item, field) {
      return typeof item[field] === 'string' && item[field].trim().length > 1
        ? item[field]
        : undefined;
    }
    facilityArray.some(item => {
      const name = parsedField(item, 'name');
      const spec = parsedField(item, 'spec');
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
    }
    return this.verificationError;
  };
}
export default Validator;
