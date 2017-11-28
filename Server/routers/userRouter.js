import express from 'express';
import UsersController from '../controllers/userController';
import val from '../middlewares/validator';

const signupValidator = new val('users', 'signup');
const siginValidator = new val('users', 'signin');
const user = new UsersController();
const router = express.Router();

router.post('/', signupValidator.verify, user.signUp);
router.post('/login', siginValidator.verify, user.signIn);
router.get('/', user.getUsers);

export default router;
