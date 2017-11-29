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
        this.formatTime = (time) => {
            let result = false, m;
            const re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
            if ((m = time.match(re))) {
                // tinary statement
                result = (m[1].length === 2 ? '' : '0') + `${m[1]}:${m[2]}`;
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
            if (req.body.title === undefined || typeof req.body.title !== 'string'
                || req.body.title.trim().length === 0) {
                this.verificationError = this.errorMessage('Event has none or invalid title', res);
                // validate event date format: March 21, 2012
            } else if (req.body.date === undefined || isNaN(Date.parse(req.body.date))) {
                this.verificationError = this.errorMessage('Event has none or invalid date', res);
                // validate event time format: 00:00
            } else if (req.body.time === undefined || !this.formatTime(req.body.time)) {
                this.verificationError = this.errorMessage('Event has none or invalid time', res);
                // validate event description
            } else if (req.body.description === undefined || typeof req.body.description !== 'string'
                || req.body.description.trim().length === 0) {
                this.verificationError = this.errorMessage('Event has none or invalid description', res);
            } else {
                next();
            }
            return this.verificationError;
        };

        this.verifyCenter = (req, res, next) => {
            // validate center name
            if (req.body.name === undefined || typeof req.body.name !== 'string'
                || req.body.name.trim().length === 0) {
                this.verificationError = this.errorMessage('Center has none or invalid name', res);
                // validate center address
            } else if (req.body.address === undefined || typeof req.body.address !== 'string'
                || req.body.address.trim().length === 0) {
                this.verificationError = this.errorMessage('Center has none or invalid address', res);
                // validate center location
            } else if (req.body.location === undefined || typeof req.body.location !== 'string'
                || req.body.location.trim().length === 0) {
                this.verificationError = this.errorMessage('Center has none or invalid location', res);
                // validate center capacity
            } else if (req.body.capacity === undefined || isNaN(req.body.capacity)
                || req.body.capacity.trim().length === 0) {
                this.verificationError = this.errorMessage('Center has none or invalid capacity', res);
                // validate center price
            } else if (req.body.price === undefined || isNaN(req.body.price)
                || req.body.price.trim().length === 0) {
                this.verificationError = this.errorMessage('Center has none or invalid price', res);
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
                || req.body.username.trim().length === 0) {
                this.verificationError = this.errorMessage('Request has none or invalid username', res);
                // validate request name
            } else if (req.body.name === undefined || typeof req.body.name !== 'string'
                || req.body.name.trim().length === 0) {
                this.verificationError = this.errorMessage('Request has none or invalid name', res);
                // validate request email
            } else if (req.body.email === undefined || typeof req.body.email !== 'string'
                || req.body.email.trim().length === 0) {
                this.verificationError = this.errorMessage('Request has none or invalid email', res);
                // validate request phone number
            } else if (req.body.phoneNo === undefined || isNaN(req.body.phoneNo)
                || req.body.phoneNo.trim().length === 0) {
                this.verificationError = this.errorMessage('Request has none or invalid phone no.', res);
                // validate request account type
            } else if (req.body.accountType === undefined || typeof req.body.accountType !== 'string'
                || req.body.accountType.trim().length === 0) {
                this.verificationError = this.errorMessage('Request has none or invalid account type', res);
                // validate request account type enum
            } else if (!(req.body.accountType === 'regular' || req.body.accountType === 'admin')) {
                this.verificationError = this.errorMessage('Account type can either be [regular] or [admin]', res);
                // validate request password
            } else if (req.body.password === undefined
                || typeof req.body.password !== 'string' || req.body.password.trim().length < 6) {
                this.verificationError = this.errorMessage('Request has none or invalid password', res);
                // validate request confirm password
            } else if (req.body.confirmPassword === undefined || typeof req.body.confirmPassword !== 'string'
                || req.body.confirmPassword.trim().length < 6) {
                this.verificationError = this.errorMessage('Request has none or invalid confirm password', res);
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
            if (req.body.username === undefined ||
                typeof req.body.username !== 'string' || req.body.username.trim().length === 0) {
                this.verificationError = this.errorMessage('Request has none or invalid username', res);
                // validate request password
            } else if (req.body.password === undefined
                || typeof req.body.password !== 'string' || req.body.password.trim().length < 6) {
                this.verificationError = this.errorMessage('Request has none or invalid password', res);
            } else {
                next();
            }
            return this.verificationError;
        };
    }
}

export default Validator;
