import models from '../models';
import val from '../middlewares/validator';

const validator = new val('centers');
const model = models.Centers;

class Centers {
    // add an event
    addCenter(req, res) {
        models.Users.findById(req.decoded.id).then(user => {
            if (user.accountType === 'admin') {
                return model.findAll()
                    .then(centers => { // destructuring
                        const { name, address, location, capacity, price, picture } = req.body;
                        if (centers.length !== 0) {
                            centers.forEach(center => {
                                if (center.name === name
                                    && center.location === location
                                    && center.address === address) {
                                    // unacceptable
                                    return validator.response(res, 'err', 406, 'Center already exists');
                                }
                            });
                        }
                        const newEntry = { name, address, location, userId: req.decoded.id, picture,
                            capacity: parseInt(capacity), price: parseInt(price),
                        };
                        return model.create(newEntry)
                             .then(created => validator.response(res, 'success', 201, created))
                             .catch(error => validator.response(res, 'error', 500, error));
                    }).catch(error => validator.response(res, 'error', 500, error));
            }
            return validator.response(res, 'error', 403, 'Only an admin can perform this action');
        }).catch(error => validator.response(res, 'error', 500, error));
    }

    // modify a center
    modifyCenter(req, res) {
        // get center with same index as parameter and change the value
        if (validator.confirmParams(req, res)) { // destructuring
            const { name, address, location, capacity, price, picture } = req.body;
            const modifiedEntry = { name, address, location, picture, userId: req.decoded.id,
                capacity: parseInt(capacity), price: parseInt(price) };
            return model.update(modifiedEntry, { where: { id: req.params.id, userId: req.decoded.id } })
               .then(updatedCenter => {
                   if (updatedCenter[0] === 1) {
                       return validator.response(res, 'success', 202, 'Update successful');
                   }
                   // trying to update a center whose id does not exist
                   // and or which doesnt belong to the user
                   return validator.response(res, 'error', 403, 'Attempt to update unexisting or unauthorized item');
               }).catch(error => validator.response(res, 'error', 500, error));
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
            return model.findById(req.params.id, { include:
                [{ model: models.Events, as: 'events' },
                { model: models.Facilities, as: 'facilities' }],
            }).then(center => {
                if (center !== null) {
                    return validator.response(res, 'success', 200, center);
                }
                return validator.response(res, 'error', 404, 'Could not find Center');
            }).catch(error => validator.response(res, 'error', 500, error));
        }
        return validator.invalidParameter;
    }
}

const centerController = new Centers();
export default centerController;
