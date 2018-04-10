import models from '../models';
import Val from '../middlewares/validator';
import cloudinary from 'cloudinary';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eventmgronline@gmail.com',
    pass: 'isikote657',
  },
});
cloudinary.config({
  cloud_name: 'eventmanager',
  api_key: '789891965151338',
  api_secret: 'ynezeVbgUnGIfNYKj19GvyrflSI',
});

const validator = new Val('events');
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
        // console.log('Events were gotten from db');
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
            // forbidden
            errorMessage = {
              Sorry: 'Selected date is already occupied for selected center',
              OccupiedDates: Array.from(occupiedDates),
            };
          }
        });
        if (errorMessage) {
          return validator.responseWithCloudinary(req, res, 406, errorMessage);
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
                      .then(response => validator.response(res, 'success', 201, response))
                      .catch(error => validator.responseWithCloudinary(req, res, 500, error))
                  )
                  .catch(error => validator.responseWithCloudinary(req, res, 400, error));
              }
              return validator.responseWithCloudinary(
                req,
                res,
                406,
                'Selected center is unavailable'
              );
            })
            .catch(() =>
              validator.responseWithCloudinary(req, res, 400, 'Center selected does not exist')
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
      .catch(error => validator.responseWithCloudinary(req, res, 500, error));
  }

  // modify an event
  modifyEvent(req, res) {
    // get event with same index as parameter and change the value
    if (validator.confirmParams(req, res) === true) {
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
            return validator.responseWithCloudinary(req, res, 406, errorMessage);
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
                              .then(response => validator.response(res, 'success', 201, response))
                              .catch(error =>
                                validator.responseWithCloudinary(req, res, 500, error)
                              );
                          }
                          return update();
                        })
                        .catch(error => validator.responseWithCloudinary(req, res, 400, error));
                    })
                    .catch(() =>
                      validator.responseWithCloudinary(
                        req,
                        res,
                        403,
                        'Unexisting or unauthorized item'
                      )
                    );
                }
                return validator.responseWithCloudinary(
                  req,
                  res,
                  406,
                  'Selected center is unavailable'
                );
              })
              .catch(() =>
                validator.responseWithCloudinary(req, res, 400, 'Center selected does not exist')
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
        .catch(error => validator.responseWithCloudinary(req, res, 500, error));
    }
    cloudinary.v2.uploader.destroy(req.body.publicId);
    return validator.invalidParameter;
  }

  // delete an event
  deleteEvent(req, res) {
    if (validator.confirmParams(req, res) === true) {
      return model
        .destroy({ where: { id: req.params.id, userId: req.decoded.id } })
        .then(() => {
          cloudinary.v2.uploader.destroy(req.query.file);
          return validator.response(res, 'success', 200, 'Successfully deleted');
        })
        .catch(() => validator.response(res, 'error', 400, 'Invalid transaction'));
      // Event does not exist or User not priviledged to delete
    }
    return validator.invalidParameter;
  }

  // Get all events
  getEvents(req, res) {
    // gets all users' details excluding password
    return model
      .findAll({
        where: { status: 'approved' },
        include: [
          { model: models.Centers, as: 'center' },
          { model: models.Users, as: 'user', attributes: { exclude: ['password'] } },
        ],
        attributes: { exclude: ['centerId', 'userId'] },
      })
      .then(allEvents => {
        if (allEvents.length !== 0) {
          return validator.response(res, 'success', 200, allEvents);
        }
        return validator.response(res, 'error', 404, 'No events available');
      })
      .catch(error => validator.response(res, 'error', 500, error));
  }
  getEventDetails(req, res) {
    if (validator.confirmParams(req, res) === true) {
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
            return validator.response(res, 'success', 200, event);
          }
          return validator.response(res, 'error', 404, 'Could not find Event');
        })
        .catch(error => validator.response(res, 'error', 500, error));
    }
    return validator.invalidParameter;
  }
  approveEvent(req, res) {
    if (validator.confirmParams(req, res) === true) {
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
              return validator.response(res, 'error', 406, errorMessage);
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
                    return validator.response(res, 'success', 200, updatedEvent);
                  });
                }
                return validator.response(
                  res,
                  'error',
                  403,
                  'Not priviledge to perform this action'
                );
              })
              .catch(() => validator.response(res, 'error', 404, 'The event does not exist'));
          })
          .catch(error => validator.response(res, 'error', 500, error));
      }
      return validator.response(res, 'error', 400, 'Status should be [approve] or [reject]');
    }
    return validator.invalidParameter;
  }
}

const events = new Events();
export default events;
