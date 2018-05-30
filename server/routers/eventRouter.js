import express from 'express';
import Events from '../controllers/eventController';
import Val from '../middlewares/validator';
import Auth from '../middlewares/authenticator';

const Validator = new Val('events');
const approvalValidator = new Val('approval');
const router = express.Router();

router.post('/', Validator.verify, Auth.Verify, Events.addEvent);
router.put('/:id', Validator.verify, Auth.Verify, Events.modifyEvent);
router.delete('/:id', Auth.Verify, Events.deleteEvent);
router.get('/', Events.getEvents);
router.get('/:id', Events.getEventDetails); // no validation required
router.put('/approve/:id', approvalValidator.verify, Auth.Verify, Events.approveEvent);

export default router;
