import express from 'express';
import Events from '../controllers/eventController';
import val from '../middlewares/validator';
import Auth from '../middlewares/authenticator';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/events'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const upload = multer({ storage: storage });
const Validator = new val('events');
const router = express.Router();

router.post('/', upload.single('picture'), Validator.verify, Auth.Verify, Events.addEvent);
router.put('/:id', upload.single('picture'), Validator.verify, Auth.Verify, Events.modifyEvent);
router.delete('/:id', Auth.Verify, Events.deleteEvent);
router.get('/', Events.getEvents);
router.get('/:id', Events.getEventDetails); // no validation required

export default router;
