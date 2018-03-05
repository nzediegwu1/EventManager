import models from '../models';
import val from '../middlewares/validator';
import fs from 'fs';
import path from 'path';

const validator = new val('centers');
const model = models.Centers;

class Centers {
  // add an event
  addCenter(req, res) {
    if (req.file === undefined || typeof req.file !== 'object' || req.file.filename === undefined ||
      req.file.originalname === undefined || req.file.encoding === undefined || req.file.mimetype === undefined ||
      req.file.destination === undefined || req.file.path === undefined || req.file.size === undefined) {
      return validator.response(res, 'error', 400, 'Invalid or undefined Center Image');
    } else {
      models.Users.findById(req.decoded.id).then(user => {
        if (user.accountType === 'admin') {
          return model.findAll()
            .then(centers => { // destructuring
              const { name, address, location, capacity, price, picture, availability } = req.body;
              let sameCenter = '';
              if (centers.length !== 0) {
                centers.forEach(center => {
                  if (center.name === name
                    && center.location === location
                    && center.address === address) {
                    // unacceptable
                    sameCenter = 'Same center already exists';
                  }
                });
              }
              if (sameCenter !== '') {
                return validator.response(res, 'err', 406, sameCenter);
              }
              const newEntry = {
                name, address, location, picture: req.file.filename, availability, userId: req.decoded.id,
                capacity: parseInt(capacity), price: parseInt(price),
              };
              return model.create(newEntry)
                .then(created => {
                  return model.findById(created.id, {
                    include: [
                      { model: models.Events, as: 'events' },
                      { model: models.Facilities, as: 'facilities' },                      
                      { model: models.Users, as: 'user', attributes: { exclude: ['password'] } }
                    ],
                    attributes: { exclude: ['userId'] }
                  }).then(response => validator.response(res, 'success', 201, response))
                    .catch(err => validator.response(res, 'error', 500, err))
                })
                .catch(error => validator.response(res, 'error', 500, error));
            }).catch(error => validator.response(res, 'error', 500, error));
        }
        return validator.response(res, 'error', 403, 'Only an admin can perform this action');
      }).catch(error => validator.response(res, 'error', 500, error));
    }
  }

  // modify a center
  modifyCenter(req, res) {
    // get center with same index as parameter and change the value
    if (validator.confirmParams(req, res)) { // destructuring
      return model.findAll()
        .then(centers => { // destructuring
          const { name, address, location, capacity, price, availability } = req.body;
          let sameCenter = '';
          if (centers.length !== 0) {
            centers.forEach(center => {
              if (center.name === name
                && center.location === location
                && center.address === address && center.id !== parseInt(req.params.id)) {
                // unacceptable
                sameCenter = 'Same center already exists';
              }
            });
          }
          if (sameCenter !== '') {
            return validator.response(res, 'error', 406, sameCenter);
          }
          let modifiedEntry;
          if (req.file) {
            modifiedEntry = {
              name, address, location, availability, picture: req.file.filename, userId: req.decoded.id,
              capacity: parseInt(capacity), price: parseInt(price)
            };
            let picturePath;
            return model.findOne({ where: { id: req.params.id, userId: req.decoded.id } })
              .then(found => {
                picturePath = path.join(__dirname, `../public/centers/${found.picture}`);
                found.updateAttributes(modifiedEntry).then(updatedCenter => {
                  fs.unlink(picturePath, (err) => {
                    return model.findById(updatedCenter.id, {
                      include: [
                        { model: models.Events, as: 'events' },
                        { model: models.Facilities, as: 'facilities' },                        
                        { model: models.Users, as: 'user', attributes: { exclude: ['password'] } }
                      ],
                      attributes: { exclude: ['userId'] }
                    }).then(response => validator.response(res, 'success', 201, response))
                      .catch(err => validator.response(res, 'error', 500, err))
                  });
                }).catch(error => validator.response(res, 'error', 500, error));
                // trying to update a center whose id does not exist
                // and or which doesnt belong to the user
              }).catch(err => validator.response(res, 'error', 403, 'Attempt to update unexisting or unauthorized item'));
          } else {
            modifiedEntry = {
              name, address, location, availability, userId: req.decoded.id, capacity: parseInt(capacity),
              price: parseInt(price)
            };
            return model.findOne({ where: { id: req.params.id, userId: req.decoded.id } })
              .then(found => {
                found.updateAttributes(modifiedEntry).then(updatedCenter => {
                  return model.findById(updatedCenter.id, {
                    include: [
                      { model: models.Events, as: 'events' },
                      { model: models.Facilities, as: 'facilities' },                      
                      { model: models.Users, as: 'user', attributes: { exclude: ['password'] } }
                    ],
                    attributes: { exclude: ['userId'] }
                  }).then(response => validator.response(res, 'success', 201, response))
                    .catch(err => validator.response(res, 'error', 500, err))
                }).catch(error => validator.response(res, 'error', 500, error));
                // trying to update a center whose id does not exist
                // and or which doesnt belong to the user
              }).catch(err => validator.response(res, 'error', 403, 'Attempt to update unexisting or unauthorized item'));
          }
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
      return model.findById(req.params.id,
        {
          include: [
            { model: models.Events, as: 'events' },
            { model: models.Facilities, as: 'facilities' },
            { model: models.Users, as: 'user', attributes: { exclude: ['password'] } }
          ]
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
