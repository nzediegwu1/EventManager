import models from '../models';
import cloudinary from 'cloudinary';
import {
  cloudinaryConfig,
  errorResponseWithCloudinary,
  restResponse,
  invalidParameter,
  confirmParams,
  eventEntry,
  checkAvailability,
} from '../util';
import { findById, update, getAll, create, modifyEvent, updateAndEmail } from '../services';

const include = [
  { model: models.Centers, as: 'center' },
  {
    model: models.Users,
    as: 'user',
    attributes: { exclude: ['password'] },
  },
];
const attributes = { exclude: ['userId'] };
cloudinary.config(cloudinaryConfig);
const model = models.Events;

class Events {
  // add an event
  addEvent(req, res) {
    const { date, time, centerId } = req.body;
    return model
      .findAll({ where: { centerId: parseInt(centerId, 10) } })
      .then(events => {
        const timestamp = new Date(`${date} ${time}`);
        const availability = checkAvailability(req, res, timestamp, events);
        if (availability !== true) {
          return availability;
        }
        const newEntry = eventEntry(req, timestamp);
        return models.Centers.findById(centerId)
          .then(center => {
            if (center.availability === 'open') {
              return create(req, res, model, newEntry, attributes, include);
            }
            return errorResponseWithCloudinary(req, res, 406, 'Selected center is unavailable');
          })
          .catch(() =>
            errorResponseWithCloudinary(req, res, 400, 'Center selected does not exist')
          );
      })
      .catch(error => errorResponseWithCloudinary(req, res, 500, error));
  }

  // modify an event
  modifyEvent(req, res) {
    if (confirmParams(req, res) === true) {
      const { date, time, centerId } = req.body;
      const timestamp = new Date(`${date} ${time}`);
      const then = modified =>
        models.Centers.findById(centerId)
          .then(center => {
            if (center.availability === 'open') {
              const condition = { id: req.params.id, userId: req.decoded.id };
              return update(req, res, model, modified, condition, attributes, include);
            }
            return errorResponseWithCloudinary(req, res, 406, 'Selected center is unavailable');
          })
          .catch(() =>
            errorResponseWithCloudinary(req, res, 400, 'Center selected does not exist')
          );
      return modifyEvent(req, res, model, centerId, timestamp, then);
    }
    cloudinary.v2.uploader.destroy(req.body.publicId);
    return invalidParameter;
  }

  // delete an event
  deleteEvent(req, res) {
    if (confirmParams(req, res) === true) {
      return model
        .destroy({ where: { id: req.params.id, userId: req.decoded.id } })
        .then(response => {
          if (response === 0) {
            // Event does not exist or User not priviledged to delete
            return restResponse(res, 'error', 401, 'Invalid transaction');
          }
          cloudinary.v2.uploader.destroy(req.query.file);
          return restResponse(res, 'success', 200, 'Successfully deleted');
        })
        .catch(err => restResponse(res, 'error', 500, err));
    }
    return invalidParameter;
  }

  // Get all events
  getEvents(req, res) {
    const excludes = { exclude: ['centerId', 'userId'] };
    return getAll(req, res, model, [['date', 'ASC']], { status: 'approved' }, include, excludes);
  }

  getEventDetails(req, res) {
    if (confirmParams(req, res) === true) {
      return findById(req, res, model, req.params, attributes, include);
    }
    return invalidParameter;
  }

  approveEvent(req, res) {
    if (confirmParams(req, res) === true) {
      const eventId = req.params.id;
      const { status } = req.body;
      const then = foundEvent => {
        const text = `Dear ${foundEvent.user.name},
        \nThis is to inform you that your event titled '${foundEvent.title}' has been ${status}!
        \nBest Regards,\nAdmin`;
        return updateAndEmail(foundEvent, res, text, foundEvent.user.email, { status });
      };
      return model
        .findById(eventId, { include, attributes })
        .then(found => {
          if (!found) {
            return restResponse(res, 'error', 404, 'Event does not exist');
          } else if (found.center.userId !== req.decoded.id) {
            return restResponse(res, 'error', 403, 'No proviledge to perform action');
          }
          return modifyEvent(req, res, model, found.centerId, found.date, then, found);
        })
        .catch(err => restResponse(res, 'error', 500, err));
    }
    return invalidParameter;
  }
}

const events = new Events();
export default events;
