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

        // copied from stack-overflow: https://stackoverflow.com/questions/2048460/javascript-function-to-validate-time-0000-with-regular-expression
        this.formatTime = (time) => {
            let result = false, m;
            const re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
            if ((m = time.match(re))) {
                result = (m[1].length === 2 ? '' : '0') + m[1] + ':' + m[2];
            }
            return result;
        };

        this.verifyEvent = (req, res, next) => {
            if (req.body.title === undefined || typeof req.body.title !== 'string'
                || req.body.title.trim().length === 0) {
                this.verificationError = this.errorMessage('Event has none or invalid title field', res);
            } else if (req.body.date === undefined || isNaN(Date.parse(req.body.date))) {
                this.verificationError = this.errorMessage('Event has none or invalid date field', res);
            } else if (req.body.time === undefined || !this.formatTime(req.body.time)) {
                this.verificationError = this.errorMessage('Event has none or invalid time field', res);
            } else if (req.body.venue === undefined || typeof req.body.venue !== 'string'
            || req.body.venue.trim().length === 0) {
                this.verificationError = this.errorMessage('Event has none or invalid venue field', res);
            } else if (req.body.description === undefined || typeof req.body.description !== 'string'
            || req.body.description.trim().length === 0) {
                this.verificationError = this.errorMessage('Event has none or invalid description field', res);
            } else {
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
