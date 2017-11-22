const validator = require('validator');
class Validator {
    constructor(model) {
        this.model = model;
        this.invalidParameter = {};
        this.verificationError = {};
        this.success = false;
        this.errorMessage = (msg, res) => this.response(res, 'err', 400, msg);
        this.verify = (req, res, next) => {
            switch (this.model) {
                case 'events':
                    this.verifyEvent(req, res, next);
                    break;
                default:
                    break;
            }
        };
        this.confirmParams = (req, res) => {
            if (isNaN(req.params.id)) {
                this.invalidParameter = this.errorMessage('invalid parameter', res);
                return this.invalidParameter;
            }
            return true;
        };

        this.verifyEvent = (req, res, next) => {
            if (req.body.title === undefined) {
                this.verificationError = this.errorMessage('Event has no title', res);
            } else if (req.body.date === undefined) {
                this.verificationError = this.errorMessage('Event has no date', res);
            } else if (req.body.time === undefined) {
                this.verificationError = this.errorMessage('Event has no time', res);
            } else if (req.body.venue === undefined) {
                this.verificationError = this.errorMessage('Event has no venue', res);
            } else if (req.body.description === undefined) {
                this.verificationError = this.errorMessage('Event has no description', res);
                // CAUSES INEXPLICABLE ERROR
            }/* else  if (typeof req.body.title !== 'string' || req.body.title.trim().length === 0) {
                this.verificationError = this.errorMessage('Event title is empty string');
            }/* else if (Date.parse(req.body.date) !== true) {
                this.verificationError = this.errorMessage('Event date in incorrect format');
            } else if (typeof req.body.time !== 'string'
            || req.body.time.trim().length === 0) {
                this.verificationError = this.errorMessage('Event time in incorrect format', res);
            } else if (typeof req.body.venue !== 'string'
            || req.body.time.trim().venue === 0) {
                this.verificationError = this.errorMessage('Event venue should be a string', res);
            } else if (typeof req.body.description !== 'string'
            || req.body.time.trim().description === 0) {
                this.verificationError = this.errorMessage('Event description should be string', res);
            } */ else {
                next();
            }
            return this.verificationError;
        };
        this.response = (res, status, statusCode, value) => {
            if (status === 'success') {
                return res.status(statusCode).json({ status: 'success', data: value });
            }
            return res.status(statusCode).json({ status: 'error', message: value });
        };
    }
}

export default Validator;
