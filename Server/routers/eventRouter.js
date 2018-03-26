import express from 'express';
import Events from '../controllers/eventController';
import Val from '../middlewares/validator';
import Auth from '../middlewares/authenticator';
import multer from 'multer';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'eventmanager',
  api_key: '789891965151338',
  api_secret: 'ynezeVbgUnGIfNYKj19GvyrflSI',
});
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Validator = new Val('events');
const router = express.Router();

router.post('/', upload.single('picture'), Validator.verify, Auth.Verify, Events.addEvent);
router.put('/:id', upload.single('picture'), Validator.verify, Auth.Verify, Events.modifyEvent);
router.delete('/:id', Auth.Verify, Events.deleteEvent);
router.get('/', Events.getEvents);
router.get('/:id', Events.getEventDetails); // no validation required

export default router;
