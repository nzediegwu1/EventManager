import cloudinary from 'cloudinary';
import nodemailer from 'nodemailer';
import {
  restResponse,
  errorResponseWithCloudinary,
  cloudinaryConfig,
  checkAvailability,
  eventEntry,
  emailConfig,
  compareCenters,
} from './util';

cloudinary.config({ cloudinaryConfig });
const transporter = nodemailer.createTransport(emailConfig);

export const findById = (req, res, model, query, attributes, include, context) =>
  model
    .findById(query.id, {
      include,
      attributes,
    })
    .then(response => {
      if (!response) {
        return restResponse(res, 'error', 404, 'Could not find item');
      }
      let statusCode;
      if (context === 'add') {
        statusCode = 201;
      } else if (context === 'update') {
        statusCode = 202;
      } else statusCode = 200;
      return restResponse(res, 'success', statusCode, response);
    });
// .catch(error => errorResponseWithCloudinary(req, res, 500, error));

export function getAll(req, res, model, order, condition, include, attributes) {
  const rawPage = req.query.pageNumber;
  const rawLimit = req.query.limit;
  const page = isNaN(rawPage) || !rawPage ? 1 : parseInt(rawPage, 10);
  const limit = isNaN(rawLimit) || !rawLimit ? 5 : parseInt(req.query.limit, 10);
  return model.findAndCountAll({ where: condition }).then(data => {
    const count = data.count;
    const pages = Math.ceil(count / limit);
    const offset = page > pages ? (pages - 1) * limit : (page - 1) * limit;
    return model
      .findAll({
        where: condition,
        include,
        attributes,
        offset: offset > 0 ? offset : -offset,
        limit,
        order,
      })
      .then(response => {
        if (response.length !== 0) {
          return restResponse(res, 'success', 200, { data: response, count });
        }
        return restResponse(res, 'error', 404, 'No resource available');
      });
    // .catch(error => restResponse(res, 'error', 500, error));
  });
}

export function updateImmediate(req, res, model, found, newData, include, attributes) {
  let oldImage;
  if (req.body.publicId) {
    oldImage = model.publicId;
  }
  function modifyStuff() {
    return found.updateAttributes(newData).then(updatedItem => {
      if (req.body.publicId) {
        cloudinary.v2.uploader.destroy(oldImage);
      }
      return findById(req, res, model, updatedItem, attributes, include, 'update');
    });
    // .catch(error => errorResponseWithCloudinary(req, res, 500, error));
  }
  if (found.availability) {
    return model
      .findAll({ where: { id: { $ne: req.params.id } } })
      .then(centers => compareCenters(req, res, centers, modifyStuff))
      .catch(() => modifyStuff());
  }
  return modifyStuff();
}

export function update(req, res, model, newData, condition, attributes, include) {
  return model.findOne({ where: condition }).then(found => {
    if (!found) {
      const message = 'Unexisting or unauthorized item';
      return errorResponseWithCloudinary(req, res, 403, message);
    }
    return updateImmediate(req, res, model, found, newData, include, attributes);
  });
  // .catch(error => errorResponseWithCloudinary(req, res, 500, error));
}
export function create(req, res, model, newData, attributes, include) {
  return model
    .create(newData)
    .then(created => findById(req, res, model, created, attributes, include, 'add'))
    .catch(error => errorResponseWithCloudinary(req, res, 500, error));
}
export function modifyEvent(req, res, model, centerId, timestamp, then, data) {
  return model.findAll({ where: { centerId, id: { $ne: req.params.id } } }).then(events => {
    const availability = checkAvailability(req, res, timestamp, events);
    if (availability !== true) {
      return availability;
    }
    const modifiedEntry = data || eventEntry(req, timestamp);
    return then(modifiedEntry);
  });
  // .catch(error => errorResponseWithCloudinary(req, res, 500, error));
}

export function updateAndEmail(foundEvent, res, text, receiver, data, subject) {
  return foundEvent.updateAttributes(data).then(updated => {
    const mailOption = {
      from: 'eventmgronline@gmail.com',
      to: receiver,
      subject: subject || `Event ${updated.status}`,
      text,
    };
    transporter.sendMail(mailOption);
    const message = 'New password has been sent to your email!';
    return restResponse(res, 'success', 202, subject ? message : updated);
  });
}
