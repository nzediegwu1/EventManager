import models from '../models';
import Val from '../middlewares/validator';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'eventmanager',
  api_key: '789891965151338',
  api_secret: 'ynezeVbgUnGIfNYKj19GvyrflSI',
});
const validator = new Val('centers');
const model = models.Centers;

class Centers {
  // add an event
  addCenter(req, res) {
    const { name, address, location, picture, publicId, capacity, price, availability } = req.body;

    if (
      picture === undefined ||
      typeof picture !== 'string' ||
      picture.trim().length === 0 ||
      picture.length > 254
    ) {
      const errorMessage = 'Center picture should be non-empty string less 255 characters';
      return validator.responseWithCloudinary(req, res, 400, errorMessage);
      // validate center image public_id
    } else if (
      publicId === undefined ||
      typeof publicId !== 'string' ||
      publicId.trim().length === 0 ||
      publicId.length > 254
    ) {
      const errorMessage = 'Center image public_id should be non-empty string less 255 characters';
      return validator.responseWithCloudinary(req, res, 400, errorMessage);
    }
    return models.Users.findById(req.decoded.id)
      .then(user => {
        if (user.accountType === 'admin' || user.accountType === 'super') {
          return model
            .findAll()
            .then(centers => {
              let sameCenter;
              if (centers.length !== 0) {
                centers.forEach(center => {
                  if (
                    center.name === name &&
                    center.location === location &&
                    center.address === address
                  ) {
                    // unacceptable
                    sameCenter = 'Same center already exists';
                  }
                });
              }
              if (sameCenter) {
                return validator.responseWithCloudinary(req, res, 406, sameCenter);
              }
              const newEntry = {
                name,
                address,
                location,
                availability,
                picture,
                publicId,
                userId: req.decoded.id,
                capacity: parseInt(capacity, 10),
                price: parseInt(price, 10),
              };
              return model
                .create(newEntry)
                .then(created =>
                  model
                    .findById(created.id, {
                      include: [
                        { model: models.Events, as: 'events' },
                        { model: models.Facilities, as: 'facilities' },
                        {
                          model: models.Users,
                          as: 'user',
                          attributes: { exclude: ['password'] },
                        },
                      ],
                      attributes: { exclude: ['userId'] },
                    })
                    .then(response => validator.response(res, 'success', 201, response))
                    .catch(error => validator.responseWithCloudinary(req, res, 500, error))
                )
                .catch(error => validator.responseWithCloudinary(req, res, 500, error));
            })
            .catch(error => validator.responseWithCloudinary(req, res, 500, error));
        }
        const errorMessage = 'Only an admin can perform this action';
        return validator.responseWithCloudinary(req, res, 403, errorMessage);
      })
      .catch(error => validator.responseWithCloudinary(req, res, 500, error));
  }

  // modify a center
  modifyCenter(req, res) {
    // get center with same index as parameter and change the value
    if (validator.confirmParams(req, res) === true) {
      // destructuring
      return model
        .findAll()
        .then(centers => {
          // destructuring
          const {
            name,
            address,
            location,
            picture,
            publicId,
            capacity,
            price,
            availability,
          } = req.body;
          let sameCenter;
          if (centers.length !== 0) {
            centers.forEach(center => {
              if (
                center.name === name &&
                center.location === location &&
                center.address === address &&
                center.id !== parseInt(req.params.id, 10)
              ) {
                // unacceptable
                sameCenter = 'Same center already exists';
              }
            });
          }
          if (sameCenter) {
            return validator.responseWithCloudinary(req, res, 406, sameCenter);
          }
          let oldImage;
          function modifyCenter(modified) {
            return model
              .findOne({ where: { id: req.params.id, userId: req.decoded.id } })
              .then(found => {
                if (req.body.publicId) {
                  oldImage = found.publicId;
                }
                return found
                  .updateAttributes(modified)
                  .then(updatedCenter => {
                    if (req.body.publicId) {
                      cloudinary.v2.uploader.destroy(oldImage);
                    }
                    function update() {
                      return model
                        .findById(updatedCenter.id, {
                          include: [
                            { model: models.Events, as: 'events' },
                            { model: models.Facilities, as: 'facilities' },
                            {
                              model: models.Users,
                              as: 'user',
                              attributes: { exclude: ['password'] },
                            },
                          ],
                          attributes: { exclude: ['userId'] },
                        })
                        .then(response => validator.response(res, 'success', 201, response))
                        .catch(error => validator.responseWithCloudinary(req, res, 500, error));
                    }
                    return update();
                  })
                  .catch(error => validator.responseWithCloudinary(req, res, 500, error));
              })
              .catch(() => {
                const errorMessage = 'Attempt to update unexisting or unauthorized item';
                return validator.responseWithCloudinary(req, res, 403, errorMessage);
              });
          }
          const modifiedEntry = {
            name,
            address,
            location,
            availability,
            picture,
            publicId,
            userId: req.decoded.id,
            capacity: parseInt(capacity, 10),
            price: parseInt(price, 10),
          };
          return modifyCenter(modifiedEntry);
        })
        .catch(error => validator.responseWithCloudinary(req, res, 500, error));
    }
    cloudinary.v2.uploader.destroy(req.body.publicId);
    return validator.invalidParameter;
  }

  // get all centers
  getAllCenters(req, res) {
    // gets all users' details excluding password
    return model
      .findAll()
      .then(allCenters => {
        if (allCenters.length !== 0) {
          return validator.response(res, 'success', 200, allCenters);
        }
        return validator.response(res, 'error', 404, 'No centers available');
      })
      .catch(error => validator.response(res, 'error', 500, error));
  }
  // get center details
  getCenterDetails(req, res) {
    if (validator.confirmParams(req, res) === true) {
      return model
        .findById(req.params.id, {
          include: [
            { model: models.Events, as: 'events' },
            { model: models.Facilities, as: 'facilities' },
            { model: models.Users, as: 'user', attributes: { exclude: ['password'] } },
          ],
        })
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
