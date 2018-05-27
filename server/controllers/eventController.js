import models from '../models';
import cloudinary from 'cloudinary';
import nodemailer from 'nodemailer';
import {
  cloudinaryConfig,
  errorResponseWithCloudinary,
  restResponse,
  invalidParameter,
  confirmParams,
  emailConfig,
  eventEntry,
  checkAvailability,
} from '../util';
import { findById, update, getAll } from '../services';

const include = [
  { model: models.Centers, as: 'center' },
  {
    model: models.Users,
    as: 'user',
    attributes: { exclude: ['password'] },
  },
];
const attributes = { exclude: ['userId'] };
const transporter = nodemailer.createTransport(emailConfig);
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
        function createNewEvent(entry) {
          return models.Centers.findById(centerId)
            .then(center => {
              if (center.availability === 'open') {
                return model
                  .create(entry)
                  .then(created => findById(req, res, model, created, attributes, include))
                  .catch(error => errorResponseWithCloudinary(req, res, 400, error));
              }
              return errorResponseWithCloudinary(req, res, 406, 'Selected center is unavailable');
            })
            .catch(() =>
              errorResponseWithCloudinary(req, res, 400, 'Center selected does not exist')
            );
        }
        const newEntry = eventEntry(req, timestamp);
        return createNewEvent(newEntry);
      })
      .catch(error => errorResponseWithCloudinary(req, res, 500, error));
  }

  // modify an event
  modifyEvent(req, res) {
    if (confirmParams(req, res) === true) {
      const { date, time, centerId } = req.body;
      const timestamp = new Date(`${date} ${time}`);
      return model
        .findAll({ where: { centerId: parseInt(centerId, 10), id: { $ne: req.params.id } } })
        .then(events => {
          const availability = checkAvailability(req, res, timestamp, events);
          if (availability !== true) {
            return availability;
          }
          function modifyEvent(modified) {
            return models.Centers.findById(centerId)
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
          }
          const modifiedEntry = eventEntry(req, timestamp);
          return modifyEvent(modifiedEntry);
        })
        .catch(error => errorResponseWithCloudinary(req, res, 500, error));
    }
    cloudinary.v2.uploader.destroy(req.body.publicId);
    return invalidParameter;
  }

  // delete an event
  deleteEvent(req, res) {
    if (confirmParams(req, res) === true) {
      return model
        .destroy({ where: { id: req.params.id, userId: req.decoded.id } })
        .then(() => {
          cloudinary.v2.uploader.destroy(req.query.file);
          return restResponse(res, 'success', 200, 'Successfully deleted');
        })
        .catch(() => restResponse(res, 'error', 400, 'Invalid transaction'));
      // Event does not exist or User not priviledged to delete
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
      const { date, time, status, centerId } = req.body;
      const timestamp = new Date(`${date} ${time}`);
      if (status === 'approved' || status === 'rejected') {
        const eventId = parseInt(req.params.id, 10);
        return model
          .findAll({ where: { centerId: parseInt(centerId, 10), id: { $ne: req.params.id } } })
          .then(events => {
            const availability = checkAvailability(req, res, timestamp, events);
            if (availability !== true) {
              return availability;
            }
            return model
              .findById(eventId, {
                include,
                attributes,
              })
              .then(found => {
                if (found.center.userId === req.decoded.id) {
                  const data = { status };
                  return found.updateAttributes(data).then(updatedEvent => {
                    const text = `Dear ${
                      updatedEvent.user.name
                    },\n\nThis is to inform you that your event titled '${
                      updatedEvent.title
                    }' has been ${updatedEvent.status}!\n\nBest Regards,\nAdmin`;
                    const mailOption = {
                      from: 'eventmgronline@gmail.com',
                      to: updatedEvent.user.email,
                      subject: `Event ${updatedEvent.status}`,
                      text,
                    };
                    transporter.sendMail(mailOption);
                    return restResponse(res, 'success', 200, updatedEvent);
                  });
                }
                return restResponse(res, 'error', 403, 'Not priviledge to perform this action');
              })
              .catch(() => restResponse(res, 'error', 404, 'The event does not exist'));
          })
          .catch(error => restResponse(res, 'error', 500, error));
      }
      return restResponse(res, 'error', 400, 'Status should be [approve] or [reject]');
    }
    return invalidParameter;
  }
}

const events = new Events();
export default events;
