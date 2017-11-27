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
                    // not acceptabe
                    return validator.response(res, 'error', 406, 'Center already Exists');
                }
            }
            const { name, address, location, capacity, price } = req.body;
            const newEntry = { name, address, location,
                capacity: parseInt(capacity), price: parseInt(price),
            };
            models.push(newEntry);
            return validator.response(res, 'success', 201, models[models.length - 1]);
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
                    const { name, address, location, capacity, price } = req.body;
                    const newEntry = {
                        name,
                        address,
                        location,
                        capacity: parseInt(capacity),
                        price: parseInt(price),
                    };

                    models[itemId] = newEntry;
                    return validator.response(res, 'success', 200, models[itemId]);
                }
            });
            return validator.response(res, 'error', 404, 'No such center found');
        }
        return validator.confirmParams(req, res);
    }

    // get all centers
    getAllCenters(req, res) {
        if (models.length !== 0) {
            return validator.response(res, 'success', 200, models);
        }
        return validator.response(res, 'error', 200, 'No centers available');
    }

    // get center details
    getCenterDetails(req, res) {
        if (validator.confirmParams(req, res)) {
            const centerId = req.params.id;
            models.forEach(center => {
                const itemId = models.indexOf(center);
                if (parseInt(centerId) === itemId) {
                    return validator.response(res, 'success', 200, models[itemId]);
                }
            });
            return validator.response(res, 'error', 404, 'No such center found');
        }
        return validator.confirmParams(req, res);
    }

}

const centers = new Centers();
export default centers;
