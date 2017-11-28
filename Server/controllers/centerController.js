import models from '../models';
import val from '../middlewares/validator';

const validator = new val('centers');
const model = models.Centers;

class Centers {
    // add an event
    addCenter(req, res) {
        return model.findAll()
            .then(centers => {
                const { name, address, location, capacity, price, UserId } = req.body; // destructuring
                if (centers.length !== 0) {
                    centers.forEach(center => {
                        if (center.name === name
                            && center.location === location
                            && center.address === address) {
                            // forbidden
                            return validator.response(res, 'err', 403, 'Center already exists');
                        }
                    });
                }
                const newEntry = { name, address, location, UserId,
                    capacity: parseInt(capacity), price: parseInt(price),
                };
                return model.create(newEntry)
                     .then(created => validator.response(res, 'success', 200, created))
                     .catch(error => validator.response(res, 'error', 500, error));
            }).catch(error => validator.response(res, 'error', 500, error));
    }

    // modify a center
    modifyCenter(req, res) {
        // get center with same index as parameter and change the value
        if (validator.confirmParams(req, res)) {
            const { name, address, location, capacity, price, UserId } = req.body; // destructuring
            const modifiedEntry = { name, address, location, UserId,
                capacity: parseInt(capacity), price: parseInt(price),
            };
            return model.update(modifiedEntry, { where: { id: req.params.id, UserId: UserId } })
               .then(updatedCenter => {
                   if (updatedCenter[0] === 1) {
                       return validator.response(res, 'success', 200, 'Update successful');
                   }
                   // trying to update a center whose id does not exist
                   // and or which doesnt belong to the user
                   return validator.response(res, 'error', 403, 'Invalid transaction');
               })
               .catch(error => validator.response(res, 'error', 500, error));
        }
        return validator.invalidParameter;
    }

    // get all centers
    getAllCenters(req, res) {
        // gets all users' details excluding password
        return model.findAll()
            .then(allCenters => {
                if (allCenters.length !== 0) {
                    return validator.response(res, 'success', 200, allCenters);
                }
                return validator.response(res, 'error', 200, 'No centers available');
            }).catch(error => validator.response(res, 'error', 500, error));
    }
    // get center details
    getCenterDetails(req, res) {
        if (validator.confirmParams(req, res)) {
            return model.findById(req.params.id) // { include: [model.Events]
            .then(center => {
                if (center !== null) {
                    return validator.response(res, 'success', 200, center);
                }
                return validator.response(res, 'error', 404, 'Could not find Center');
            })
            .catch(error => validator.response(res, 'error', 500, error));
        }
        return validator.invalidParameter;
    }
}

const centerController = new Centers();
export default centerController;
