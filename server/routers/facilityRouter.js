import express from 'express';
import Facilities from '../controllers/facilityController';
import Val from '../middlewares/validator';
import Auth from '../middlewares/authenticator';

const Validator = new Val('facilities');
const router = express.Router();

router.post('/:centerId', Validator.verify, Auth.Verify, Facilities.addFacility);

export default router;

