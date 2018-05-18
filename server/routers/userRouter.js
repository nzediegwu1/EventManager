import express from 'express';
import UsersController from '../controllers/userController';
import Val from '../middlewares/validator';
import Auth from '../middlewares/authenticator';


const signupValidator = new Val('users', 'signup');
const siginValidator = new Val('users', 'signin');
const profilePicValidator = new Val('users', 'changePic');
const user = new UsersController();
const router = express.Router();

router.post('/', signupValidator.verify, user.signUp);
router.post('/login', siginValidator.verify, user.signIn);
router.get('/', Auth.Verify, user.getUsers);
router.get('/:id', user.getUserProfile);
router.put('/', signupValidator.verify, Auth.Verify, user.modifyProfile);
router.put('/:id/upgrade', Auth.Verify, user.upgradeAccount);
router.put('/changePic', profilePicValidator.verify, Auth.Verify, user.changeProfilePic);
router.post('/password', user.recoverPassword);

export default router;
