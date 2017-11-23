class Validator {
    constructor(model) {
        this.model = model;
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

        // validate time
        this.formatTime = (time) => {
            let result = false, m;
            const re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
            if ((m = time.match(re))) {
                result = (m[1].length === 2 ? '' : '0') + m[1] + ':' + m[2];
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
                default:
                    break;
            }
        };

        this.verifyEvent = (req, res, next) => {
            // validate event title
            if (req.body.title === undefined || typeof req.body.title !== 'string'
                || req.body.title.trim().length === 0) {
                this.verificationError = this.errorMessage('Event has none or invalid title field', res);
                // validate event date format: March 21, 2012
            } else if (req.body.date === undefined || isNaN(Date.parse(req.body.date))) {
                this.verificationError = this.errorMessage('Event has none or invalid date field', res);
                // validate event time format: 00:00
            } else if (req.body.time === undefined || !this.formatTime(req.body.time)) {
                this.verificationError = this.errorMessage('Event has none or invalid time field', res);
                // validate event venue
            } else if (req.body.venue === undefined || typeof req.body.venue !== 'string'
            || req.body.venue.trim().length === 0) {
                this.verificationError = this.errorMessage('Event has none or invalid venue field', res);
                // validate event description
            } else if (req.body.description === undefined || typeof req.body.description !== 'string'
            || req.body.description.trim().length === 0) {
                this.verificationError = this.errorMessage('Event has none or invalid description field', res);
                // validate that extra fields are not contained in request:
                // can be removed when sequelize model is integrated
            } else if (Object.keys(req.body).length !== 5) {
                this.verificationError = this.errorMessage('Request body contain invalid fields', res);
            } else {
                next();
            }
            return this.verificationError;
        };

        this.verifyCenter = (req, res, next) => {
            // validate center name
            if (req.body.name === undefined || typeof req.body.name !== 'string'
                || req.body.name.trim().length === 0) {
                this.verificationError = this.errorMessage('Center has none or invalid name field', res);
                // validate center address
            } else if (req.body.address === undefined || typeof req.body.address !== 'string'
                || req.body.address.trim().length === 0) {
                this.verificationError = this.errorMessage('Center has none or invalid address field', res);
                // validate center location
            } else if (req.body.location === undefined || typeof req.body.location !== 'string'
                || req.body.location.trim().length === 0) {
                this.verificationError = this.errorMessage('Center has none or invalid location field', res);
                // validate center capacity
            } else if (req.body.capacity === undefined || isNaN(req.body.capacity)
                || req.body.capacity.trim().length === 0) {
                this.verificationError = this.errorMessage('Center has none or invalid capacity field', res);
                // validate center price
            } else if (req.body.price === undefined || isNaN(req.body.price)
                || req.body.price.trim().length === 0) {
                this.verificationError = this.errorMessage('Center has none or invalid price field', res);
                // validate that extra fields are not contained in request:
                // can be removed when sequelize model is integrated
            } else if (Object.keys(req.body).length !== 5) {
                this.verificationError = this.errorMessage('Request body contain invalid fields', res);
            } else {
                next();
            }
            return this.verificationError;
        };
    }
}

export default Validator;
