import models from './models';
import cloudinary from 'cloudinary';
import { restResponse, errorResponseWithCloudinary, cloudinaryConfig } from './util';

cloudinary.config({ cloudinaryConfig });

export const findById = (req, res, model, query, attributes, include) =>
  model
    .findById(query.id, {
      include,
      attributes,
    })
    .then(response => {
      if (!response) {
        return restResponse(res, 'error', 404, 'Could not find Resource');
      }
      return restResponse(res, 'success', 200, response);
    })
    .catch(error => errorResponseWithCloudinary(req, res, 500, error));

export function getAll(req, res, model, order, condition, include, attributes) {
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
        where: condition,
        include,
        attributes,
        offset,
        limit,
        order,
      })
      .then(response => {
        if (response.length !== 0) {
          return restResponse(res, 'success', 200, { data: response, count });
        }
        return restResponse(res, 'error', 404, 'No resource available');
      })
      .catch(error => restResponse(res, 'error', 500, error));
  });
}

export function updateImmediate(req, res, model, newData) {
  let oldImage;
  if (req.body.publicId) {
    oldImage = model.publicId;
  }
  return model
    .updateAttributes(newData)
    .then(updatedItem => {
      if (req.body.publicId) {
        cloudinary.v2.uploader.destroy(oldImage);
      }
      if (updatedItem.password) {
        updatedItem.password = null;
      }
      return restResponse(res, 'success', 200, updatedItem);
    })
    .catch(error => errorResponseWithCloudinary(req, res, 500, error));
}

export function update(req, res, model, newData, condition, attributes, include) {
  return model
    .findOne({ where: condition, include, attributes })
    .then(found => {
      if (!found) {
        const message = 'Unexisting or unauthorized item';
        return errorResponseWithCloudinary(req, res, 403, message);
      }
      return updateImmediate(req, res, found, newData);
    })
    .catch(error => errorResponseWithCloudinary(req, res, 500, error));
}
