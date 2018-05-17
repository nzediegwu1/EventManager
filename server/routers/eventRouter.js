import express from 'express';
import Events from '../controllers/eventController';
import Val from '../middlewares/validator';
import Auth from '../middlewares/authenticator';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'eventmanager',
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});
const Validator = new Val('events');
const router = express.Router();

router.post('/', Validator.verify, Auth.Verify, Events.addEvent);
router.put('/:id', Validator.verify, Auth.Verify, Events.modifyEvent);
router.delete('/:id', Auth.Verify, Events.deleteEvent);
router.get('/', Events.getEvents);
router.get('/:id', Events.getEventDetails); // no validation required
router.put('/approve/:id', Auth.Verify, Events.approveEvent);

export default router;
