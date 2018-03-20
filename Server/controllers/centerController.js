import models from '../models';
import Val from '../middlewares/validator';
import cloudinary from 'cloudinary';

const validator = new Val('centers');
const model = models.Centers;

class Centers {
  // add an event
  addCenter(req, res) {
    if (req.file === undefined || typeof req.file !== 'object' || req.file.buffer === undefined) {
      return validator.response(res, 'error', 400, 'Invalid or undefined Center Image');
    }
    return models.Users.findById(req.decoded.id)
      .then(user => {
        if (user.accountType === 'admin') {
          return model
            .findAll()
            .then(centers => {
              // destructuring
              const { name, address, location, capacity, price, availability } = req.body;
              let sameCenter = '';
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
              if (sameCenter !== '') {
                return validator.response(res, 'err', 406, sameCenter);
              }
              cloudinary.v2.uploader
                .upload_stream(
                  { folder: 'centers/', public_id: `${Date.now()}-${req.file.originalname}` },
                  (err, result) => {
                    if (err) {
                      return validator.response(res, 'error', 500, 'Could not upload image');
                    }
                    const newEntry = {
                      name,
                      address,
                      location,
                      availability,
                      picture: result.secure_url,
                      public_id: result.public_id,
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
                          .catch(error => validator.response(res, 'error', 500, error))
                      )
                      .catch(error => validator.response(res, 'error', 500, error));
                  }
                )
                .end(req.file.buffer);
            })
            .catch(error => validator.response(res, 'error', 500, error));
        }
        return validator.response(res, 'error', 403, 'Only an admin can perform this action');
      })
      .catch(error => validator.response(res, 'error', 500, error));
  }

  // modify a center
  modifyCenter(req, res) {
    // get center with same index as parameter and change the value
    if (validator.confirmParams(req, res)) {
      // destructuring
      return model
        .findAll()
        .then(centers => {
          // destructuring
          const { name, address, location, capacity, price, availability } = req.body;
          let sameCenter = '';
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
          if (sameCenter !== '') {
            return validator.response(res, 'error', 406, sameCenter);
          }

          function modifyCenter(modified) {
            return model
              .findOne({ where: { id: req.params.id, userId: req.decoded.id } })
              .then(found => {
                const publicId = found.public_id;
                return found
                  .updateAttributes(modified)
                  .then(updatedCenter => {
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
                        .catch(err => validator.response(res, 'error', 500, err));
                    }
                    if (req.file) {
                      return cloudinary.v2.uploader.destroy(publicId, () => update());
                    }
                    return update();
                  })
                  .catch(error => validator.response(res, 'error', 500, error));
              })
              .catch(() => {
                const response = validator.response(
                  res,
                  'error',
                  403,
                  'Attempt to update unexisting or unauthorized item'
                );
                if (modified.public_id) {
                  return cloudinary.v2.uploader.destroy(modified.public_id, () => response);
                }
                return response;
              });
          }
          let modifiedEntry;
          if (req.file) {
            cloudinary.v2.uploader
              .upload_stream(
                { folder: 'centers/', public_id: `${Date.now()}-${req.file.originalname}` },
                (err, result) => {
                  if (err) {
                    return validator.response(res, 'error', 500, 'Could not upload image');
                  }
                  modifiedEntry = {
                    name,
                    address,
                    location,
                    availability,
                    picture: result.secure_url,
                    public_id: result.public_id,
                    userId: req.decoded.id,
                    capacity: parseInt(capacity, 10),
                    price: parseInt(price, 10),
                  };
                  return modifyCenter(modifiedEntry);
                }
              )
              .end(req.file.buffer);
          } else {
            modifiedEntry = {
              name,
              address,
              location,
              availability,
              userId: req.decoded.id,
              capacity: parseInt(capacity, 10),
              price: parseInt(price, 10),
            };
            return modifyCenter(modifiedEntry);
          }
        })
        .catch(error => validator.response(res, 'error', 500, error));
    }
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
        return validator.response(res, 'error', 200, 'No centers available');
      })
      .catch(error => validator.response(res, 'error', 500, error));
  }
  // get center details
  getCenterDetails(req, res) {
    if (validator.confirmParams(req, res)) {
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
