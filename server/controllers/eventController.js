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
} from '../util';

const transporter = nodemailer.createTransport(emailConfig);
cloudinary.config({ cloudinaryConfig });
const model = models.Events;

class Events {
  // add an event
  addEvent(req, res) {
    const { title, date, time, picture, publicId, description, centerId } = req.body;
    return model
      .findAll({ where: { centerId: parseInt(centerId, 10) } })
      .then(events => {
        // destructuring
        const timestamp = new Date(`${date} ${time}`);
        const day = timestamp.getDate();
        const month = timestamp.getMonth();
        const year = timestamp.getFullYear();
        const occupiedDates = new Set();
        let errorMessage;
        events.forEach(event => {
          const eventDate = event.date;
          const eventDay = eventDate.getDate();
          const eventMonth = eventDate.getMonth();
          const eventYear = eventDate.getFullYear();
          const eventStatus = event.status;
          occupiedDates.add(new Date(eventDate).toDateString());
          if (
            eventStatus !== 'rejected' &&
            eventDay === day &&
            eventMonth === month &&
            eventYear === year
          ) {
            // forbidden
            errorMessage = {
              Sorry: 'Selected date is already occupied for selected center',
              OccupiedDates: Array.from(occupiedDates),
            };
          }
        });
        if (errorMessage) {
          return errorResponseWithCloudinary(req, res, 406, errorMessage);
        }
        function createNewEvent(entry) {
          return models.Centers.findById(centerId)
            .then(center => {
              if (center.availability === 'open') {
                return model
                  .create(entry)
                  .then(created =>
                    model
                      .findById(created.id, {
                        include: [
                          { model: models.Centers, as: 'center' },
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
                  .catch(error => errorResponseWithCloudinary(req, res, 400, error));
              }
              return errorResponseWithCloudinary(req, res, 406, 'Selected center is unavailable');
            })
            .catch(() =>
              errorResponseWithCloudinary(req, res, 400, 'Center selected does not exist')
            );
        }
        const newEntry = {
          title,
          date: timestamp,
          description,
          picture,
          publicId,
          userId: req.decoded.id,
          centerId,
        };
        return createNewEvent(newEntry);
      })
      .catch(error => errorResponseWithCloudinary(req, res, 500, error));
  }

  // modify an event
  modifyEvent(req, res) {
    // get event with same index as parameter and change the value
    if (confirmParams(req, res) === true) {
      const { title, date, time, picture, publicId, description, centerId } = req.body;
      const timestamp = new Date(`${date} ${time}`);
      return model
        .findAll({ where: { centerId: parseInt(centerId, 10) } })
        .then(events => {
          const day = timestamp.getDate();
          const month = timestamp.getMonth();
          const year = timestamp.getFullYear();
          const occupiedDates = new Set();
          let errorMessage;
          events.forEach(event => {
            const eventDate = event.date;
            const eventDay = eventDate.getDate();
            const eventMonth = eventDate.getMonth();
            const eventYear = eventDate.getFullYear();
            const eventStatus = event.status;
            if (event.id !== parseInt(req.params.id, 10)) {
              occupiedDates.add(new Date(eventDate).toDateString());
            }
            if (
              event.id !== parseInt(req.params.id, 10) &&
              eventStatus !== 'rejected' &&
              event.centerId === parseInt(centerId, 10) &&
              eventDay === day &&
              eventMonth === month &&
              eventYear === year
            ) {
              errorMessage = {
                Sorry: `Selected date is already occupied for centerId: ${centerId}`,
                OccupiedDates: Array.from(occupiedDates),
              };
            }
          });
          if (errorMessage) {
            return errorResponseWithCloudinary(req, res, 406, errorMessage);
          }
          let oldImage;
          function modifyEvent(modified) {
            return models.Centers.findById(centerId)
              .then(center => {
                if (center.availability === 'open') {
                  return model
                    .findOne({ where: { id: req.params.id, userId: req.decoded.id } })
                    .then(found => {
                      if (req.body.publicId) {
                        oldImage = found.publicId;
                      }
                      return found
                        .updateAttributes(modified)
                        .then(updatedEvent => {
                          if (req.body.publicId) {
                            cloudinary.v2.uploader.destroy(oldImage);
                          }
                          function update() {
                            model
                              .findById(updatedEvent.id, {
                                include: [
                                  { model: models.Centers, as: 'center' },
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
                        .catch(error => errorResponseWithCloudinary(req, res, 400, error));
                    })
                    .catch(() => {
                      const message = 'Unexisting or unauthorized item';
                      return errorResponseWithCloudinary(req, res, 403, message);
                    });
                }
                return errorResponseWithCloudinary(req, res, 406, 'Selected center is unavailable');
              })
              .catch(() =>
                errorResponseWithCloudinary(req, res, 400, 'Center selected does not exist')
              );
          }

          const modifiedEntry = {
            title,
            date: timestamp,
            description,
            picture,
            publicId,
            userId: req.decoded.id,
            centerId,
          };
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
    const rawPage = req.query.pageNumber;
    const rawLimit = req.query.limit;
    const page = isNaN(rawPage) || !rawPage ? 1 : parseInt(rawPage, 10);
    const limit = isNaN(rawLimit) || !rawLimit ? 5 : parseInt(req.query.limit, 10);
    return model
      .findAndCountAll({ where: { status: 'approved' } })
      .then(data => {
        const count = data.count;
        const pages = Math.ceil(count / limit);
        const offset = page > pages ? (pages - 1) * limit : (page - 1) * limit;
        return model
          .findAll({
            where: { status: 'approved' },
            include: [
              { model: models.Centers, as: 'center' },
              { model: models.Users, as: 'user', attributes: { exclude: ['password'] } },
            ],
            attributes: { exclude: ['centerId', 'userId'] },
            offset,
            limit,
            order: [['date', 'ASC']],
          })
          .then(allEvents => {
            if (allEvents.length !== 0) {
              return restResponse(res, 'success', 200, { data: allEvents, count });
            }
            return restResponse(res, 'error', 404, 'No events available');
          })
          .catch(error => restResponse(res, 'error', 500, error));
      })
      .catch(error => restResponse(res, 'error', 500, error));
  }

  getEventDetails(req, res) {
    if (confirmParams(req, res) === true) {
      return model
        .findById(req.params.id, {
          include: [
            { model: models.Centers, as: 'center' },
            { model: models.Users, as: 'user', attributes: { exclude: ['password'] } },
          ],
          attributes: { exclude: ['userId'] },
        })
        .then(event => {
          if (event !== null) {
            return restResponse(res, 'success', 200, event);
          }
          return restResponse(res, 'error', 404, 'Could not find Event');
        })
        .catch(error => restResponse(res, 'error', 500, error));
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
          .findAll({ where: { centerId: parseInt(centerId, 10) } })
          .then(events => {
            const day = timestamp.getDate();
            const month = timestamp.getMonth();
            const year = timestamp.getFullYear();
            const occupiedDates = new Set();
            let errorMessage;
            events.forEach(event => {
              const eventDate = event.date;
              const eventDay = eventDate.getDate();
              const eventMonth = eventDate.getMonth();
              const eventYear = eventDate.getFullYear();
              const eventStatus = event.status;
              if (event.id !== parseInt(req.params.id, 10)) {
                occupiedDates.add(new Date(eventDate).toDateString());
              }
              if (
                event.id !== parseInt(req.params.id, 10) &&
                eventStatus !== 'rejected' &&
                eventDay === day &&
                eventMonth === month &&
                eventYear === year
              ) {
                errorMessage = {
                  Sorry: `Selected date is already occupied for centerId: ${centerId}`,
                  OccupiedDates: Array.from(occupiedDates),
                };
              }
            });
            if (errorMessage) {
              return restResponse(res, 'error', 406, errorMessage);
            }
            return model
              .findById(eventId, {
                include: [
                  { model: models.Centers, as: 'center' },
                  {
                    model: models.Users,
                    as: 'user',
                    attributes: { exclude: ['password'] },
                  },
                ],
                attributes: { exclude: ['userId'] },
              })
              .then(found => {
                if (found.center.userId === req.decoded.id) {
                  const data = { status };
                  return found.updateAttributes(data).then(updatedEvent => {
                    const mailOption = {
                      from: 'eventmgronline@gmail.com',
                      to: updatedEvent.user.email,
                      subject: `Event ${updatedEvent.status}`,
                      text: `Dear ${
                        updatedEvent.user.name
                      },\n\nThis is to inform you that your event titled '${
                        updatedEvent.title
                      }' has been ${updatedEvent.status}!\n\nBest Regards,\nAdmin`,
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
