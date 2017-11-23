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

    // modify an event
    modifyCenter(req, res) {
        if (validator.confirmParams(req, res)) {
            const centerId = req.params.id;
            models.forEach(center => {
                const itemId = models.indexOf(center);
                if (parseInt(centerId) === itemId) {
                    models[itemId] = req.body;
                    return validator.response(res, 'success', 201, models[itemId]);
                }
            });
            return validator.response(res, 'error', 400, 'No such center found');
        }
        return validator.confirmParams(req, res);
    }

    // get all centers
    getAllCenters(req, res) {
        if (models.length !== 0) {
            return validator.response(res, 'success', 200, models);
        }
        return validator.response(res, 'error', 400, 'No centers available');
    }
}

const centers = new Centers();
export default centers;
