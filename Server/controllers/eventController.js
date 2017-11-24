import models from '../models/events';
import val from '../middlewares/validator';

const validator = new val('events');

class Events {
    // add an event
    addEvent(req, res) {
        try {
            // implement check for if such event already exists
            for (let i = 0; i < models.length; i++) {
                if (models[i].title === req.body.title && models[i].date === req.body.date
                    && models[i].venue === req.body.venue) {
                    return validator.response(res, 'error', 400, 'Event already Exists');
                }
            }
            const { title, date, time, venue, description } = req.body;
            const newEntry = {
                title,
                date,
                time,
                venue,
                description,
            };
            models.push(newEntry);
            return validator.response(res, 'success', 201, models[models.length - 1]);
        } catch (e) {
            return validator.response(res, 'error', 500, 'A server error occured');
        }
    }


    // modify an event
    modifyEvent(req, res) {
        if (validator.confirmParams(req, res)) {
            const eventid = req.params.id;
            models.forEach(event => {
                const itemId = models.indexOf(event);
                if (parseInt(eventid) === itemId) {
                    const { title, date, time, venue, description } = req.body;
                    const newEntry = {
                        title,
                        date,
                        time,
                        venue,
                        description,
                    };
                    models[itemId] = newEntry;
                    return validator.response(res, 'success', 202, models[itemId]); // accepted
                }
            });
            return validator.response(res, 'error', 404, 'No such event found');
        }
        return validator.confirmParams(req, res);
    }

    // delete an event
    deleteEvent(req, res) {
        if (validator.confirmParams(req, res)) {
            const eventid = req.params.id;
            models.forEach(event => {
                if (parseInt(eventid) === models.indexOf(event)) {
                    models.splice(models.indexOf(event), 1);
                    return validator.response(res, 'success', 200, 'Successfully deleted');
                }
            });
            return validator.response(res, 'error', 400, 'Attempt to delete unexisting event');
        }
        return validator.confirmParams(req, res);
    }
    getEvents(req, res) {
        if (models.length !== 0) {
            return validator.response(res, 'success', 200, models);
        }
        return validator.response(res, 'error', 200, 'No events available');
    }
}

const events = new Events();
export default events;
