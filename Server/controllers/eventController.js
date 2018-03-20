import models from '../models';
import Val from '../middlewares/validator';
import cloudinary from 'cloudinary';

const validator = new Val('events');
const model = models.Events;

class Events {
  // add an event
  addEvent(req, res) {
    return model
      .findAll()
      .then(events => {
        // destructuring
        const { title, date, time, description, centerId } = req.body;
        const timestamp = new Date(`${date} ${time}`);

        if (events.length !== 0) {
          const day = timestamp.getDate();
          const month = timestamp.getMonth();
          const year = timestamp.getFullYear();
          const occupiedDates = [];
          let errorMessage = '';
          // console.log('Events were gotten from db');
          events.forEach(event => {
            const eventDate = event.date;
            const eventDay = eventDate.getDate();
            const eventMonth = eventDate.getMonth();
            const eventYear = eventDate.getFullYear();
            if (event.centerId === parseInt(centerId, 10)) {
              occupiedDates.push(eventDate);
            }
            if (
              event.centerId === parseInt(centerId, 10) &&
              eventDay === day &&
              eventMonth === month &&
              eventYear === year
            ) {
              // forbidden
              errorMessage = {
                Sorry: 'Selected date is already occupied for selected center',
                OccupiedDates: occupiedDates,
              };
            }
          });
          if (errorMessage !== '') {
            return validator.response(res, 'error', 406, errorMessage);
          }
        }
        let newEntry;
        function createNewEvent(entry) {
          return model
            .create(entry)
            .then(created =>
              model
                .findById(created.id, {
                  include: [
                    { model: models.Centers, as: 'center' },
                    { model: models.Users, as: 'user', attributes: { exclude: ['password'] } },
                  ],
                  attributes: { exclude: ['centerId', 'userId'] },
                })
                .then(response => validator.response(res, 'success', 201, response))
                .catch(err => validator.response(res, 'error', 500, err))
            )
            .catch(error => {
              let errorMessage;
              if (error.name === 'SequelizeForeignKeyConstraintError') {
                errorMessage = 'center selected for event does not exist in database';
              }
              if (entry.public_id) {
                return cloudinary.v2.uploader.destroy(entry.public_id, () =>
                  validator.response(res, 'error', 400, errorMessage)
                );
              }
              return validator.response(res, 'error', 400, errorMessage);
            });
        }
        if (req.file) {
          cloudinary.v2.uploader
            .upload_stream(
              { folder: 'events/', public_id: `${Date.now()}-${req.file.originalname}` },
              (err, result) => {
                if (err) {
                  return validator.response(res, 'error', 500, 'Could not upload image');
                }
                newEntry = {
                  title,
                  date: timestamp,
                  description,
                  picture: result.secure_url,
                  userId: req.decoded.id,
                  centerId,
                  public_id: result.public_id,
                };
                return createNewEvent(newEntry);
              }
            )
            .end(req.file.buffer);
        } else {
          newEntry = { title, date: timestamp, description, userId: req.decoded.id, centerId };
          return createNewEvent(newEntry);
        }
      })
      .catch(error => validator.response(res, 'error', 500, error));
  }

  // modify an event
  modifyEvent(req, res) {
    // get event with same index as parameter and change the value
    if (validator.confirmParams(req, res)) {
      // destructuring
      const { title, date, time, description, centerId } = req.body;
      const timestamp = new Date(`${date} ${time}`);
      // console.log(`Time stamp generated: ${timestamp}`);
      model
        .findAll()
        .then(events => {
          // destructuring
          if (events.length !== 0) {
            const day = timestamp.getDate();
            const month = timestamp.getMonth();
            const year = timestamp.getFullYear();
            const occupiedDates = [];
            let errorMessage = '';
            // console.log('Events were gotten from db');
            events.forEach(event => {
              const eventDate = event.date;
              const eventDay = eventDate.getDate();
              const eventMonth = eventDate.getMonth();
              const eventYear = eventDate.getFullYear();
              if (event.centerId === parseInt(centerId, 10)) {
                occupiedDates.push(eventDate);
              }
              if (
                event.centerId === parseInt(centerId, 10) &&
                eventDay === day &&
                eventMonth === month &&
                eventYear === year
              ) {
                // forbidden
                // console.log(`Event ID is ${event.id} and req.params.id is ${req.params.id}`);
                if (event.id !== parseInt(req.params.id, 10)) {
                  errorMessage = {
                    Sorry: `Selected date is already occupied for centerId: ${centerId}`,
                    OccupiedDates: occupiedDates,
                  };
                  // console.log('unacceptable error here');
                }
              }
            });
            if (errorMessage !== '') {
              return validator.response(res, 'err', 406, errorMessage);
            }
          }
          function modifyEvent(modified) {
            return model
              .findOne({ where: { id: req.params.id, userId: req.decoded.id } })
              .then(found => {
                const publicId = found.public_id;
                return found
                  .updateAttributes(modified)
                  .then(updatedEvent => {
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
                          attributes: { exclude: ['centerId', 'userId'] },
                        })
                        .then(response => validator.response(res, 'success', 201, response))
                        .catch(err => validator.response(res, 'error', 500, err));
                    }
                    if (req.file) {
                      return cloudinary.v2.uploader.destroy(publicId, () => update());
                    }
                    return update();
                  })
                  .catch(error => {
                    let errorMessage = '';
                    if (error.name === 'SequelizeForeignKeyConstraintError') {
                      errorMessage = 'center selected for event does not exist in table';
                    }
                    if (modified.public_id) {
                      return cloudinary.v2.uploader.destroy(modified.public_id, () =>
                        validator.response(res, 'error', 400, errorMessage)
                      );
                    }
                    return validator.response(res, 'error', 400, errorMessage);
                  });
              })
              .catch(() => {
                const response = validator.response(
                  res,
                  'error',
                  403,
                  'Attempt to update unexisting or unauthorized item'
                ); // trying to update a unexisting or unauthorized center
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
                { folder: 'events/', public_id: `${Date.now()}-${req.file.originalname}` },
                (err, result) => {
                  if (err) {
                    return validator.response(res, 'error', 500, 'Could not upload image');
                  }
                  modifiedEntry = {
                    title,
                    date: timestamp,
                    description,
                    picture: result.secure_url,
                    userId: req.decoded.id,
                    centerId,
                    public_id: result.public_id,
                  };
                  return modifyEvent(modifiedEntry);
                }
              )
              .end(req.file.buffer);
          } else {
            modifiedEntry = {
              title,
              date: timestamp,
              description,
              userId: req.decoded.id,
              centerId,
            };
            return modifyEvent(modifiedEntry);
          }
        })
        .catch(err => validator.response(res, 'error', 500, err));
    }
    return validator.invalidParameter;
  }

  // delete an event
  deleteEvent(req, res) {
    // get recipe where index is same as id parameter and delete
    if (validator.confirmParams(req, res)) {
      let imageToDelete;
      return model
        .findOne({ where: { id: req.params.id, userId: req.decoded.id } })
        .then(foundEvent => {
          imageToDelete = foundEvent.public_id;
          return foundEvent
            .destroy()
            .then(() =>
              cloudinary.v2.uploader.destroy(imageToDelete, () =>
                validator.response(res, 'success', 200, 'Successfully deleted')
              )
            )
            .catch(error => validator.response(res, 'error', 500, error));
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
        return validator.response(res, 'error', 200, 'No events available');
      })
      .catch(error => validator.response(res, 'error', 500, error));
  }
  getEventDetails(req, res) {
    if (validator.confirmParams(req, res)) {
      return model
        .findById(req.params.id, {
          include: [
            { model: models.Centers, as: 'center' },
            { model: models.Users, as: 'user', attributes: { exclude: ['password'] } },
          ],
          attributes: { exclude: ['centerId', 'userId'] },
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
}

const events = new Events();
export default events;
