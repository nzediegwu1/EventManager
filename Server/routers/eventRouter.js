import express from 'express';
import Events from '../controllers/eventController';
import val from '../middlewares/validator';


const Validator = new val('events');
const router = express.Router();

router.post('/', Validator.verify, Events.postEvent);
export default router;
