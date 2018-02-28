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

    // validate time using 24-hours format 00:00
    this.formatTime = time => {
      let result = false;
      const re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
      const m = time.match(re);
      if (m) { // tinary statement
        result = `${(m[1].length === 2 ? '' : '0')}${m[1]}:${m[2]}`;
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
        default:
          break;
      }
    };

    this.verifyEvent = (req, res, next) => {
      // validate event title
      const today = new Date();
      if (req.body.title === undefined || typeof req.body.title !== 'string'
        || req.body.title.trim().length === 0 || req.body.title.length > 99) {
        this.verificationError = this.errorMessage('Event title should be non-empty string less 100 characters', res);
        // validate event date format: March 21, 2012
      } else if (req.body.date === undefined || isNaN(Date.parse(req.body.date))
        || Date.parse(req.body.date) < Date.parse(today)) {
        this.verificationError = this.errorMessage('Event has none or invalid date', res);
        // validate event time format: 00:00
      } else if (req.body.time === undefined || !this.formatTime(req.body.time)) {
        this.verificationError = this.errorMessage('Event has none or invalid time', res);
        // validate event description
      } else if (req.body.description === undefined || typeof req.body.description !== 'string'
        || req.body.description.trim().length === 0 || req.body.description.length > 254) {
        this.verificationError = this.errorMessage('Event description should be non-empty string less 255 characters', res);
        // validate centerId
      } else if (req.body.centerId === undefined || isNaN(req.body.centerId)
        || req.body.centerId.trim().length === 0 || parseInt(req.body.centerId) > 2000000) {
        this.verificationError = this.errorMessage('Invalid center selected', res);
      } else {
        next();
      }
      return this.verificationError;
    };

    this.verifyCenter = (req, res, next) => {
      // validate center name
      if (req.body.name === undefined || typeof req.body.name !== 'string'
        || req.body.name.trim().length === 0 || req.body.name.length > 99) {
        this.verificationError = this.errorMessage('Center name should be non-empty string less 100 characters', res);
        // validate center address
      } else if (req.body.address === undefined || typeof req.body.address !== 'string'
        || req.body.address.trim().length === 0 || req.body.address.length > 254) {
        this.verificationError = this.errorMessage('Center address should be non-empty string less 255 characters', res);
        // validate center location
      } else if (req.body.location === undefined || typeof req.body.location !== 'string'
        || req.body.location.trim().length === 0 || req.body.location.length > 254) {
        this.verificationError = this.errorMessage('Center location should be non-empty string less 255 characters', res);
        // validate center capacity
      } else if (req.body.capacity === undefined || isNaN(req.body.capacity)
        || req.body.capacity.trim().length === 0 || parseInt(req.body.capacity) > 2000000) {
        this.verificationError = this.errorMessage('Center capacity should be number less 2m', res);
        // validate center price
      } else if (req.body.price === undefined || isNaN(req.body.price)
        || req.body.price.trim().length === 0 || parseInt(req.body.price) > 2000000) {
        this.verificationError = this.errorMessage('Center price should be number less 2m', res);
      } else if (req.file === undefined || typeof req.file !== 'object' || req.file.filename === undefined ||
        req.file.originalname === undefined || req.file.encoding === undefined || req.file.mimetype === undefined ||
        req.file.destination === undefined || req.file.path === undefined || req.file.size === undefined) {
        this.verificationError = this.errorMessage('Invalid or undefined Center Image', res);
      } else if (req.body.availability !== undefined && !(req.body.availability === 'open'
        || req.body.availability === 'close')) {
        this.verificationError = this.errorMessage('Availability should be either [open] or [close]', res);
      } else {
        next();
      }
      return this.verificationError;
    };
    this.verifyUser = (req, res, context, next) => {
      if (context === 'signup') {
        return this.verifySinup(req, res, next);
      }
      return this.verifySignin(req, res, next);
    };
    this.verifySinup = (req, res, next) => {
      // validate request username
      if (req.body.username === undefined || typeof req.body.username !== 'string'
        || req.body.username.trim().length === 0 || req.body.username.length > 99) {
        this.verificationError = this.errorMessage('Username should be non-empty string less 100 characters', res);
        // validate request name
      } else if (req.body.name === undefined || typeof req.body.name !== 'string'
        || req.body.name.trim().length === 0 || req.body.name.length > 99) {
        this.verificationError = this.errorMessage('Name should be non-empty string less 100 characters', res);
        // validate request email
      } else if (req.body.email === undefined || typeof req.body.email !== 'string'
        || req.body.email.trim().length === 0 || req.body.email.length > 99) {
        this.verificationError = this.errorMessage('Email should be non-empty string less 100 characters', res);
        // validate request phone number
      } else if (req.body.phoneNo === undefined || isNaN(req.body.phoneNo)
        || req.body.phoneNo.trim().length === 0 || req.body.phoneNo.length > 15) {
        this.verificationError = this.errorMessage('Request has none or invalid phone no.', res);
        // validate request account type
      } else if (!(req.body.accountType === 'regular' || req.body.accountType === 'admin')) {
        this.verificationError = this.errorMessage('Account type should either be conf[regular] or [adim]', res);
        // validate request password
      } else if (req.body.password === undefined
        || typeof req.body.password !== 'string' || req.body.password.trim().length < 6) {
        this.verificationError = this.errorMessage('Password should be string not less than 6', res);
        // validate request confirm password
      } else if (req.body.confirmPassword === undefined || typeof req.body.confirmPassword !== 'string'
        || req.body.confirmPassword.trim().length < 6) {
        this.verificationError = this.errorMessage('Request has none or invalid confirmation password', res);
        // validate request password matching
      } else if (req.body.confirmPassword !== req.body.password) {
        this.verificationError = this.errorMessage('Request passwords do not match', res);
      } else {
        next();
      }
      return this.verificationError;
    };
    this.verifySignin = (req, res, next) => {
      // validate request username
      if (req.body.username === undefined || typeof req.body.username !== 'string'
        || req.body.username.trim().length === 0 || req.body.username.length > 99) {
        this.verificationError = this.errorMessage('Username should be non-empty string less 100 characters', res);
        // validate request password
      } else if (req.body.password === undefined
        || typeof req.body.password !== 'string' || req.body.password.trim().length < 6) {
        this.verificationError = this.errorMessage('Password should be string not less than 6', res);
      } else {
        next();
      }
      return this.verificationError;
    };
  }
}

export default Validator;
