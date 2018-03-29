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
        const { title, date, time, picture, publicId, description, centerId } = req.body;
        const timestamp = new Date(`${date} ${time}`);

        if (events.length !== 0) {
          const day = timestamp.getDate();
          const month = timestamp.getMonth();
          const year = timestamp.getFullYear();
          const occupiedDates = [];
          let errorMessage;
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
          if (errorMessage) {
            return cloudinary.v2.uploader.destroy(req.body.publicId, () =>
              validator.response(res, 'error', 406, errorMessage)
            );
          }
        }
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
                .catch(error =>
                  cloudinary.v2.uploader.destroy(req.body.publicId, () =>
                    validator.response(res, 'err', 500, error)
                  )
                )
            )
            .catch(error => {
              let errorMessage;
              if (error.name === 'SequelizeForeignKeyConstraintError') {
                errorMessage = 'center selected for event does not exist in database';
              }
              return cloudinary.v2.uploader.destroy(req.body.publicId, () =>
                validator.response(res, 'error', 400, errorMessage || error)
              );
            });
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
      .catch(error =>
        cloudinary.v2.uploader.destroy(req.body.publicId, () =>
          validator.response(res, 'err', 500, error)
        )
      );
  }

  // modify an event
  modifyEvent(req, res) {
    // get event with same index as parameter and change the value
    if (validator.confirmParams(req, res) === true) {
      const { title, date, time, picture, publicId, description, centerId } = req.body;
      const timestamp = new Date(`${date} ${time}`);
      return model
        .findAll()
        .then(events => {
          if (events.length !== 0) {
            const day = timestamp.getDate();
            const month = timestamp.getMonth();
            const year = timestamp.getFullYear();
            const occupiedDates = [];
            let errorMessage;
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
                if (event.id !== parseInt(req.params.id, 10)) {
                  errorMessage = {
                    Sorry: `Selected date is already occupied for centerId: ${centerId}`,
                    OccupiedDates: occupiedDates,
                  };
                }
              }
            });
            if (errorMessage) {
              return cloudinary.v2.uploader.destroy(req.body.publicId, () =>
                validator.response(res, 'err', 406, errorMessage)
              );
            }
          }
          function modifyEvent(modified) {
            return model
              .findOne({ where: { id: req.params.id, userId: req.decoded.id } })
              .then(found =>
                found
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
                        .catch(error => cloudinary.v2.uploader.destroy(req.body.publicId, () =>
                          validator.response(res, 'err', 500, error)
                        ));
                    }
                    return update();
                  })
                  .catch(error => {
                    let errorMessage;
                    if (error.name === 'SequelizeForeignKeyConstraintError') {
                      errorMessage = 'center selected for event does not exist in table';
                    }
                    return cloudinary.v2.uploader.destroy(req.body.publicId, () =>
                      validator.response(res, 'error', 400, errorMessage || error)
                    );
                  })
              )
              .catch(() => cloudinary.v2.uploader.destroy(req.body.publicId, () =>
                validator.response(
                  res,
                  'error',
                  403,
                  'Attempt to update unexisting or unauthorized item'
                )
              ));
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
        .catch(error => cloudinary.v2.uploader.destroy(req.body.publicId, () =>
          validator.response(res, 'err', 500, error)
        ));
    }
    return cloudinary.v2.uploader.destroy(req.body.publicId, () => validator.invalidParameter);
  }

  // delete an event
  deleteEvent(req, res) {
    // get recipe where index is same as id parameter and delete
    if (validator.confirmParams(req, res) === true) {
      return model
        .destroy({ where: { id: req.params.id, userId: req.decoded.id } })
        .then(() =>
          cloudinary.v2.uploader.destroy(req.query.file, () =>
            validator.response(res, 'success', 200, 'Successfully deleted')
          )
        )
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
