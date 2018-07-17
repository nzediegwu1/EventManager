import val from 'validator';
import { isArray } from 'util';

class Validator {
  constructor(model, context) {
    this.model = model;
    this.context = context;
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

  verify = req => {
    switch (this.model) {
      case 'events':
        this.verifyEvent(req);
        break;
      case 'centers':
        this.verifyCenter(req);
        break;
      case 'users':
        this.verifyUser(req, this.context);
        break;
      case 'facilities':
        this.verifyFacilities(req);
        break;
      case 'approval':
        this.verifyApproval(req);
        break;
      default:
        break;
    }
  };

  verifyUser = (req, context) => {
    if (context === 'signup') {
      return this.verifySignup(req);
    } else if (context === 'signin') {
      return this.verifySignin(req);
    }
    return this.verifyProfilePic(req);
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

  verifyApproval = req => {
    const { status } = req;
    if (!(status === 'approved' || status === 'rejected')) {
      return 'Status should be [approved] or [rejected]';
    }
    return true;
  };

  verifyEvent = req => {
    const today = new Date();
    let message;
    const { title, date, time, description, centerId } = req;
    if (!this.isSentence(title, 3, 99)) {
      message = 'Event title should be within 4-99 characters';
      // EXAMPLE: July 17, 2018
    } else if (isNaN(Date.parse(date)) || Date.parse(date) < Date.parse(today)) {
      message = 'Event has none or invalid date';
    } else if (!time || !this.formatTime(time)) {
      message = 'Event has none or invalid time';
    } else if (!this.isSentence(description, 7, 254)) {
      message = 'Event description should be within 8-254 characters';
    } else if (!this.isNumberRange(centerId, 2000000)) {
      message = 'Invalid center selected';
    } else {
      return true;
    }
    return message;
  };

  verifyCenter = req => {
    // validate center name
    const { name, address, location, capacity, price, availability } = req;
    let message;
    if (!this.isSentence(name, 3, 99)) {
      message = 'Center name should be within 4-99 characters';
    } else if (!this.isSentence(address, 3, 254)) {
      message = 'Center address should be within 4-254 characters';
    } else if (!this.isSentence(location, 3, 254)) {
      message = 'Center location should be within 4-254 characters';
    } else if (!this.isNumberRange(capacity, 2000000)) {
      message = 'Center capacity should be number less 2m';
    } else if (!this.isNumberRange(price, 2000000)) {
      message = 'Center price should be number less 2m';
    } else if (!(availability === 'open' || availability === 'close')) {
      message = 'Availability should be either [open] or [close]';
    } else {
      console.log('returned true');
      return true;
    }
    console.log('returned error');
    return message;
  };

  validateImage = (picture, publicId) => {
    if (typeof picture !== 'string' || !val.isURL(picture)) {
      return 'Invalid picture';
    } else if (!this.isSentence(publicId, 3, 254)) {
      return 'Invalid public id';
    }
    return true;
  };

  verifyProfilePic = req => {
    const { picture, publicId } = req;
    const result = this.validateImage(picture, publicId);
    if (result !== true) {
      return result;
    }
    return true;
  };

  verifySignup = req => {
    const { username, name, email, phoneNo, password, confirmPassword } = req;
    let message;
    if (typeof username !== 'string' || !this.isValidUsername(username)) {
      message = 'Username should be alphanumeric and less than 30 characters (no special chars)';
    } else if (!this.isSentence(name, 2, 99)) {
      message = 'Full name should be string within 3-99 characters';
    } else if (typeof email !== 'string' || !val.isEmail(email)) {
      message = 'Non or Invalid email format';
    } else if (
      typeof phoneNo !== 'string' ||
      !val.isMobilePhone(phoneNo, 'any', { strictMode: true })
    ) {
      message = 'None or invalid phone no., include (+) and country code';
    } else if (!this.isSentence(password, 5, 99)) {
      message = 'Password should be within range: 6-99';
    } else if (!confirmPassword) {
      message = 'Request has no confirmation password';
    } else if (confirmPassword !== password) {
      message = 'Request passwords do not match';
    } else {
      return true;
    }
    return message;
  };

  verifySignin = req => {
    const { username, password } = req;
    let message;
    if (typeof username !== 'string' || !this.isValidUsername(username)) {
      message = 'Username should be alphanumeric and less than 30 characters (no special chars)';
    } else if (!this.isSentence(password, 5, 99)) {
      message = 'Password should be string not less than 6';
    } else {
      return true;
    }
    return message;
  };

  isJSON = data => {
    try {
      return typeof JSON.parse(data) === 'object';
    } catch (error) {
      return undefined;
    }
  };

  verifyFacilities = req => {
    const { data } = req;
    // TEST DATA: {"content":[{"name":"fish","spec":"golden","quantity":6}]}
    if (typeof data !== 'string' || !this.isJSON(data)) {
      return 'Request is not valid json';
    } else if (!JSON.parse(data).content || !isArray(JSON.parse(data).content)) {
      return 'Request does not contain valid data';
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
      return true;
    }
    return 'Request contain invalid entry(s)';
  };
}
export default Validator;
