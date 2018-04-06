import express from 'express';
import UsersController from '../controllers/userController';
import Val from '../middlewares/validator';

const signupValidator = new Val('users', 'signup');
const siginValidator = new Val('users', 'signin');
const user = new UsersController();
const router = express.Router();

router.post('/', signupValidator.verify, user.signUp);
router.post('/login', siginValidator.verify, user.signIn);
router.get('/', user.getUsers);

export default router;
