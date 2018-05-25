import models from '../models';
import cloudinary from 'cloudinary';
import {
  cloudinaryConfig,
  errorResponseWithCloudinary,
  restResponse,
  invalidParameter,
  confirmParams,
} from '../util';

cloudinary.config({ cloudinaryConfig });
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
      return errorResponseWithCloudinary(req, res, 400, errorMessage);
      // validate center image public_id
    } else if (
      publicId === undefined ||
      typeof publicId !== 'string' ||
      publicId.trim().length === 0 ||
      publicId.length > 254
    ) {
      const errorMessage = 'Center image public_id should be non-empty string less 255 characters';
      return errorResponseWithCloudinary(req, res, 400, errorMessage);
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
                return errorResponseWithCloudinary(req, res, 406, sameCenter);
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
                    .then(response => restResponse(res, 'success', 201, response))
                    .catch(error => errorResponseWithCloudinary(req, res, 500, error))
                )
                .catch(error => errorResponseWithCloudinary(req, res, 500, error));
            })
            .catch(error => errorResponseWithCloudinary(req, res, 500, error));
        }
        const errorMessage = 'Only an admin can perform this action';
        return errorResponseWithCloudinary(req, res, 403, errorMessage);
      })
      .catch(error => errorResponseWithCloudinary(req, res, 500, error));
  }

  // modify a center
  modifyCenter(req, res) {
    // get center with same index as parameter and change the value
    if (confirmParams(req, res) === true) {
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
            return errorResponseWithCloudinary(req, res, 406, sameCenter);
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
                        .then(response => restResponse(res, 'success', 201, response))
                        .catch(error => errorResponseWithCloudinary(req, res, 500, error));
                    }
                    return update();
                  })
                  .catch(error => errorResponseWithCloudinary(req, res, 500, error));
              })
              .catch(() => {
                const errorMessage = 'Attempt to update unexisting or unauthorized item';
                return errorResponseWithCloudinary(req, res, 403, errorMessage);
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
        .catch(error => errorResponseWithCloudinary(req, res, 500, error));
    }
    cloudinary.v2.uploader.destroy(req.body.publicId);
    return invalidParameter;
  }

  // get all centers
  getAllCenters(req, res) {
    const rawPage = req.query.pageNumber;
    const rawLimit = req.query.limit;
    const page = isNaN(rawPage) || !rawPage ? 1 : parseInt(rawPage, 10);
    const limit = isNaN(rawLimit) || !rawLimit ? 5 : parseInt(req.query.limit, 10);
    return model.findAndCountAll().then(data => {
      const count = data.count;
      const pages = Math.ceil(count / limit);
      const offset = page > pages ? (pages - 1) * limit : (page - 1) * limit;
      return model
        .findAll({
          offset,
          limit,
          order: [['name', 'ASC']],
        })
        .then(allCenters => {
          if (allCenters.length !== 0) {
            return restResponse(res, 'success', 200, { data: allCenters, count });
          }
          return restResponse(res, 'error', 404, 'No centers available');
        })
        .catch(error => restResponse(res, 'error', 500, error));
    });
  }
  // get center details
  getCenterDetails(req, res) {
    if (confirmParams(req, res) === true) {
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
            return restResponse(res, 'success', 200, center);
          }
          return restResponse(res, 'error', 404, 'Could not find Center');
        })
        .catch(error => restResponse(res, 'error', 500, error));
    }
    return invalidParameter;
  }
}

const centerController = new Centers();
export default centerController;
