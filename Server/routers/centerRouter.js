import express from 'express';
import Centers from '../controllers/centerController';
import val from '../middlewares/validator';
import Auth from '../middlewares/authenticator';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/centers'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const upload = multer({ storage: storage });
const Validator = new val('centers');
const router = express.Router();

router.post('/', upload.single('picture'), Validator.verify, Auth.Verify, Centers.addCenter);
router.put('/:id', upload.single('picture'), Validator.verify, Auth.Verify, Centers.modifyCenter);
router.get('/', Centers.getAllCenters); // no validation required
router.get('/:id', Centers.getCenterDetails); // no validation required

export default router;
