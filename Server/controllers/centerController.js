import models from '../models/centers';
import val from '../middlewares/validator';

const validator = new val('centers');

class Centers {
    // add an event
    addCenter(req, res) {
        try {
            // implement check for if such center already exists
            for (let i = 0; i < models.length; i++) {
                if (models[i].name === req.body.name && models[i].address === req.body.address
                    && models[i].location === req.body.location) {
                    return validator.response(res, 'error', 401, 'Center already Exists');
                }
            }
            models.push(req.body);
            return validator.response(res, 'success', 201, req.body);
        } catch (e) {
            return validator.response(res, 'error', 500, 'A server error occured');
        }
    }
}

const centers = new Centers();
export default centers;
