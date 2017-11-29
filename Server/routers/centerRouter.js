import express from 'express';
import Centers from '../controllers/centerController';
import val from '../middlewares/validator';
import Auth from '../middlewares/authenticator';

const Validator = new val('centers');
const router = express.Router();

router.post('/', Validator.verify, Auth.Verify, Centers.addCenter);
router.put('/:id', Validator.verify, Auth.Verify, Centers.modifyCenter);
router.get('/', Centers.getAllCenters); // no validation required
router.get('/:id', Centers.getCenterDetails); // no validation required

export default router;
