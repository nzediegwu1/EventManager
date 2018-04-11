import express from 'express';
import UsersController from '../controllers/userController';
import Val from '../middlewares/validator';
import Auth from '../middlewares/authenticator';


const signupValidator = new Val('users', 'signup');
const siginValidator = new Val('users', 'signin');
const user = new UsersController();
const router = express.Router();

router.post('/', signupValidator.verify, user.signUp);
router.post('/login', siginValidator.verify, user.signIn);
router.get('/', Auth.Verify, user.getUsers);
router.get('/:id', Auth.Verify, user.getUserProfile);
router.put('/:id', signupValidator.verify, Auth.Verify, user.modifyProfile);

export default router;
