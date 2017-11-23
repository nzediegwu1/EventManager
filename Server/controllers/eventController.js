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
                    return validator.response(res, 'error', 401, 'Event already Exists');
                }
            }
            models.push(req.body);
            return validator.response(res, 'success', 201, req.body);
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
                    models[itemId] = req.body;
                    return validator.response(res, 'success', 201, models[itemId]);
                }
            });
            return validator.response(res, 'error', 400, 'No such event found');
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
                    return validator.response(res, 'success', 200, event);
                }
            });
            return validator.response(res, 'error', 400, 'Attempt to delete unexisting event');
        }
        return validator.confirmParams(req, res);
    }
}

const events = new Events();
export default events;
