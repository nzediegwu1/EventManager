import express from 'express';
import Events from '../controllers/eventController';
import val from '../middlewares/validator';
import Auth from '../middlewares/authenticator';

const Validator = new val('events');
const router = express.Router();

router.post('/', Validator.verify, Auth.Verify, Events.addEvent);
router.put('/:id', Validator.verify, Auth.Verify, Events.modifyEvent);
router.delete('/:id', Auth.Verify, Events.deleteEvent);
router.get('/', Events.getEvents);

export default router;
