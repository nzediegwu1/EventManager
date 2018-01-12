import models from '../models';
import val from '../middlewares/validator';

const validator = new val('events');
const model = models.Events;


class Events {
  // add an event
  addEvent(req, res) {
    return model.findAll()
        .then(events => { // destructuring
          const { title, date, time, description, picture, centerId } = req.body;
          const timestamp = new Date(`${date} ${time}`);
          console.log(`Time stamp generated: ${timestamp}`);

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
              if (event.centerId === parseInt(centerId)) {
                occupiedDates.push(eventDate);
              }
              if (event.centerId === parseInt(centerId) && eventDay === day && eventMonth === month
                  && eventYear === year) {
                // forbidden
                errorMessage = {
                  Sorry: `Selected date is already occupied for centerId: ${centerId}`,
                  OccupiedDates: occupiedDates,
                };
                // console.log('unacceptable error here');
              }
            });
            if (errorMessage !== '') {
              return validator.response(res, 'error', 406, errorMessage);
            }
          }
          const newEntry = { title, date: timestamp, description, picture, userId: req.decoded.id, centerId };
          return model.create(newEntry)
               .then(created => validator.response(res, 'success', 201, created))
               .catch(error => {
                 let errorMessage = '';
                 if (error.name === 'SequelizeForeignKeyConstraintError') {
                   errorMessage = 'centerId selected for event does not exist in table';
                 }
                 return validator.response(res, 'error', 400, errorMessage);
               });
        }).catch(error => validator.response(res, 'error', 500, error));
  }

  // modify an event
  modifyEvent(req, res) {
    // get event with same index as parameter and change the value
    if (validator.confirmParams(req, res)) { // destructuring
      const { title, date, time, description, picture, centerId } = req.body;
      const timestamp = new Date(`${date} ${time}`);
      // console.log(`Time stamp generated: ${timestamp}`);
      model.findAll()
         .then(events => { // destructuring
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
               if (event.centerId === parseInt(centerId)) {
                 occupiedDates.push(eventDate);
               }
               if (event.centerId === parseInt(centerId) && eventDay === day && eventMonth === month
                   && eventYear === year) {
                 // forbidden
                 // console.log(`Event ID is ${event.id} and req.params.id is ${req.params.id}`);
                 if (event.id !== parseInt(req.params.id)) {
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
           const modifiedEntry = { title, date, time, description, picture, userId: req.decoded.id, centerId };
           return model.update(modifiedEntry, { where: { id: req.params.id, userId: req.decoded.id } })
              .then(updatedEvent => {
                if (updatedEvent[0] === 1) {
                  return validator.response(res, 'success', 202, 'Update successful');
                }
                // trying to update an event whose id does not exist
                // and or which doesnt belong to the user
                return validator.response(res, 'error', 403,
                    'Attempt to update unexisting or unauthorized item');
              })
              .catch(error => {
                let errorMessage = '';
                if (error.name === 'SequelizeForeignKeyConstraintError') {
                  errorMessage = 'centerId selected for event does not exist in table';
                }
                return validator.response(res, 'error', 400, errorMessage);
              });
         });
    }
    return validator.invalidParameter;
  }

  // delete an event
  deleteEvent(req, res) {
    // get recipe where index is same as id parameter and delete
    if (validator.confirmParams(req, res)) {
      return model.destroy({ where: { id: req.params.id, userId: req.decoded.id } })
          .then(destroyed => {
            if (destroyed) {
              return validator.response(res, 'success', 200, 'Successfully deleted');
            }
            // Event does not exist or User not priviledged to delete
            return validator.response(res, 'error', 400, 'Invalid transaction');
          })
          .catch(error => validator.response(res, 'error', 500, error));
    }
    return validator.invalidParameter;
  }

  // Get all events
  getEvents(req, res) {
    // gets all users' details excluding password
    return model.findAll()
        .then(allEvents => {
          if (allEvents.length !== 0) {
            return validator.response(res, 'success', 200, allEvents);
          }
          return validator.response(res, 'error', 200, 'No events available');
        }).catch(error => validator.response(res, 'error', 500, error));
  }
}

const events = new Events();
    export default events;
