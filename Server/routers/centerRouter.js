import express from 'express';
import Centers from '../controllers/centerController';
import val from '../middlewares/validator';


const Validator = new val('centers');
const router = express.Router();

router.post('/', Validator.verify, Centers.addCenter);

export default router;
