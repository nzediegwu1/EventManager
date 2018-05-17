import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'eventmanager',
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});

class Validator {
  constructor(model, context) {
    this.model = model;
    this.context = context;
    this.invalidParameter = {};
    this.verificationError = {};
    this.errorMessage = (msg, res) => this.response(res, 'err', 400, msg);
    this.confirmParams = (req, res) => {
      if (isNaN(req.params.id)) {
        this.invalidParameter = this.errorMessage('invalid parameter', res);
        return this.invalidParameter;
      }
      return true;
    };

    this.response = (res, status, statusCode, value) => {
      if (status === 'success') {
        return res.status(statusCode).json({ status: 'success', data: value });
      }
      return res.status(statusCode).json({ status: 'error', message: value });
    };
    this.responseWithCloudinary = (req, res, errorCode, errorMessage) => {
      if (req.body.publicId) {
        cloudinary.v2.uploader.destroy(req.body.publicId);
        return this.response(res, 'error', errorCode, errorMessage);
      }
      return this.response(res, 'error', errorCode, errorMessage);
    };

    // validate time using 24-hours format 00:00
    this.formatTime = time => {
      let result = false;
      const re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
      const m = time.match(re);
      if (m) {
        // tinary statement
        result = `${m[1].length === 2 ? '' : '0'}${m[1]}:${m[2]}`;
      }
      return result;
    };

    this.verify = (req, res, next) => {
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
    };

    this.verifyEvent = (req, res, next) => {
      const today = new Date();
      const { title, date, time, description, centerId } = req.body;
      // validate event title
      if (
        title === undefined ||
        typeof title !== 'string' ||
        title.trim().length === 0 ||
        title.length > 99
      ) {
        this.verificationError = this.errorMessage(
          'Event title should be non-empty string less 100 characters',
          res
        );
        // validate event date format: March 21, 2012
      } else if (
        date === undefined ||
        isNaN(Date.parse(date)) ||
        Date.parse(date) < Date.parse(today)
      ) {
        this.verificationError = this.errorMessage('Event has none or invalid date', res);
        // validate event time 24-hours format: 00:00
      } else if (time === undefined || !this.formatTime(time)) {
        this.verificationError = this.errorMessage('Event has none or invalid time', res);
        // validate event description
      } else if (
        description === undefined ||
        typeof description !== 'string' ||
        description.trim().length === 0 ||
        description.length > 254
      ) {
        this.verificationError = this.errorMessage(
          'Event description should be non-empty string less 255 characters',
          res
        );
        // validate centerId
      } else if (
        centerId === undefined ||
        isNaN(centerId) ||
        centerId.trim().length === 0 ||
        parseInt(centerId, 10) > 2000000
      ) {
        this.verificationError = this.errorMessage('Invalid center selected', res);
      } else {
        next();
        return this.verificationError;
      }
      cloudinary.v2.uploader.destroy(req.body.publicId);
      return this.verificationError;
    };

    this.verifyCenter = (req, res, next) => {
      // validate center name
      const { name, address, location, capacity, price, availability } = req.body;
      if (
        name === undefined ||
        typeof name !== 'string' ||
        name.trim().length === 0 ||
        name.length > 99
      ) {
        this.verificationError = this.errorMessage(
          'Center name should be non-empty string less 100 characters',
          res
        );
        // validate center address
      } else if (
        address === undefined ||
        typeof address !== 'string' ||
        address.trim().length === 0 ||
        address.length > 254
      ) {
        this.verificationError = this.errorMessage(
          'Center address should be non-empty string less 255 characters',
          res
        );
        // validate center location
      } else if (
        location === undefined ||
        typeof location !== 'string' ||
        location.trim().length === 0 ||
        location.length > 254
      ) {
        this.verificationError = this.errorMessage(
          'Center location should be non-empty string less 255 characters',
          res
        );
        // validate center capacity
      } else if (
        capacity === undefined ||
        isNaN(capacity) ||
        capacity.trim().length === 0 ||
        parseInt(capacity, 10) > 2000000
      ) {
        this.verificationError = this.errorMessage('Center capacity should be number less 2m', res);
        // validate center price
      } else if (
        price === undefined ||
        isNaN(price) ||
        price.trim().length === 0 ||
        parseInt(price, 10) > 2000000
      ) {
        this.verificationError = this.errorMessage('Center price should be number less 2m', res);
      } else if (
        availability !== undefined &&
        !(availability === 'open' || availability === 'close')
      ) {
        this.verificationError = this.errorMessage(
          'Availability should be either [open] or [close]',
          res
        );
      } else {
        next();
        return this.verificationError;
      }
      cloudinary.v2.uploader.destroy(req.body.publicId);
      return this.verificationError;
    };
    this.verifyUser = (req, res, context, next) => {
      if (context === 'signup') {
        return this.verifySignup(req, res, next);
      } else if (context === 'signin') {
        return this.verifySignin(req, res, next);
      }
      return this.verifyProfilePic(req, res, next);
    };
    this.verifyProfilePic = (req, res, next) => {
      const { picture, publicId } = req.body;
      if (
        picture === undefined ||
        typeof picture !== 'string' ||
        picture.trim().length === 0 ||
        picture.length > 254
      ) {
        this.verificationError = this.errorMessage('Invalid Profile picture', res);
      } else if (
        publicId === undefined ||
        typeof publicId !== 'string' ||
        publicId.trim().length === 0 ||
        publicId.length > 254
      ) {
        this.verificationError = this.errorMessage('Invalid public id', res);
      } else {
        next();
        return this.verificationError;
      }
      cloudinary.v2.uploader.destroy(req.body.publicId);
      return this.verificationError;
    };
    this.verifySignup = (req, res, next) => {
      // validate request username
      const { username, name, email, phoneNo, password, confirmPassword } = req.body;
      if (
        username === undefined ||
        typeof username !== 'string' ||
        username.trim().length === 0 ||
        username.length > 99
      ) {
        this.verificationError = this.errorMessage(
          'Username should be non-empty string less 100 characters',
          res
        );
        // validate request name
      } else if (
        name === undefined ||
        typeof name !== 'string' ||
        name.trim().length === 0 ||
        name.length > 99
      ) {
        this.verificationError = this.errorMessage(
          'Name should be non-empty string less 100 characters',
          res
        );
        // validate request email
      } else if (
        email === undefined ||
        typeof email !== 'string' ||
        email.trim().length === 0 ||
        email.length > 99
      ) {
        this.verificationError = this.errorMessage(
          'Email should be non-empty string less 100 characters',
          res
        );
        // validate request phone number
      } else if (
        phoneNo === undefined ||
        isNaN(phoneNo) ||
        phoneNo.trim().length === 0 ||
        phoneNo.length > 15
      ) {
        this.verificationError = this.errorMessage('Request has none or invalid phone no.', res);
        // validate request password
      } else if (
        password === undefined ||
        typeof password !== 'string' ||
        password.trim().length < 6
      ) {
        this.verificationError = this.errorMessage(
          'Password should be string not less than 6',
          res
        );
        // validate request confirm password
      } else if (
        confirmPassword === undefined ||
        typeof confirmPassword !== 'string' ||
        confirmPassword.trim().length < 6
      ) {
        this.verificationError = this.errorMessage(
          'Request has none or invalid confirmation password',
          res
        );
        // validate request password matching
      } else if (confirmPassword !== password) {
        this.verificationError = this.errorMessage('Request passwords do not match', res);
      } else {
        next();
      }
      return this.verificationError;
    };
    this.verifySignin = (req, res, next) => {
      // validate request username
      const { username, password } = req.body;
      if (
        username === undefined ||
        typeof username !== 'string' ||
        username.trim().length === 0 ||
        username.length > 99
      ) {
        this.verificationError = this.errorMessage(
          'Username should be non-empty string less 100 characters',
          res
        );
        // validate request password
      } else if (
        password === undefined ||
        typeof password !== 'string' ||
        password.trim().length < 6
      ) {
        this.verificationError = this.errorMessage(
          'Password should be string not less than 6',
          res
        );
      } else {
        next();
      }
      return this.verificationError;
    };
    this.verifyFacilities = (req, res, next) => {
      const reqBody = JSON.parse(req.body.data);
      const facilityArray = reqBody.content;
      const facilityTable = [];
      for (let index = 0; index < facilityArray.length; index++) {
        const name =
          facilityArray[index].name && facilityArray[index].name.trim().length > 0
            ? facilityArray[index].name
            : undefined;
        const spec =
          facilityArray[index].spec && facilityArray[index].spec.trim().length > 0
            ? facilityArray[index].spec
            : undefined;
        const quantity =
          facilityArray[index].quantity && !isNaN(facilityArray[index].quantity)
            ? facilityArray[index].quantity
            : undefined;
        if (name && spec && quantity) {
          facilityTable.push({ name, spec, quantity });
        } else {
          break;
        }
      }
      if (facilityArray.length === facilityTable.length) {
        next();
      } else {
        this.verificationError = this.errorMessage('Request contain invalid entry(s)', res);
        return this.verificationError;
      }
    };
  }
}

export default Validator;
