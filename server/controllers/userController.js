import models from '../models';
import Val from '../middlewares/validator';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import bcrypt from 'bcryptjs';

const key = process.env.SECRET_KEY;
const signupValidator = new Val('users', 'signup');
const signinValidator = new Val('users', 'signin');

const users = models.Users;
class Users {
  signUp(req, res) {
    return users
      .findAll()
      .then(members => {
        let accountType;
        if (members.length !== 0) {
          for (const item in members) {
            // if username/email already exists
            if (
              members[item].username === req.body.username ||
              members[item].email === req.body.email ||
              members[item].phoneNo === req.body.phoneNo
            ) {
              // unacceptable
              return signupValidator.response(res, 'err', 406, 'User already exists');
            }
          }
        }
        console.log(`members.length: ${members.length}`);
        if (members.length === 0) {
          accountType = 'super';
        }
        // create new user
        const { username, name, email, phoneNo, password } = req.body;

        return users
          .create({
            username,
            name,
            email,
            phoneNo,
            accountType,
            password: bcrypt.hashSync(password, 10),
          })
          .then(createdUser => {
            const newUser = {
              id: createdUser.id,
              username,
              name,
              email,
              accountType: createdUser.accountType,
              phoneNo: parseFloat(phoneNo),
            };
            const token = jwt.sign({ id: createdUser.id }, key, {
              expiresIn: 60 * 60 * 24,
            });
            return signupValidator.response(res, 'success', 201, {
              User: newUser,
              Token: token,
            });
          })
          .catch(error => signupValidator.response(res, 'error', 500, error));
      })
      .catch(error => signupValidator.response(res, 'error', 500, error));
  }
  signIn(req, res) {
    return users
      .findOne({ where: { username: req.body.username } })
      .then(loggedInUser => {
        if (bcrypt.compareSync(req.body.password, loggedInUser.password)) {
          const token = jwt.sign({ id: loggedInUser.id }, key, {
            expiresIn: 60 * 60 * 24,
          });
          return signinValidator.response(res, 'success', 200, {
            User: loggedInUser,
            Token: token,
          });
        }
        return signinValidator.response(res, 'err', 401, 'Invalid Login Details');
      })
      .catch(() => signinValidator.response(res, 'err', 404, 'User not found'));
  }
  getUsers(req, res) {
    // gets all users' details excluding password
    return users
      .findAll({ attributes: { exclude: ['password'] } })
      .then(allusers => {
        if (allusers.length > 0) {
          return signupValidator.response(res, 'success', 200, allusers);
        }
        return signupValidator.response(res, 'error', 404, 'No user found');
      })
      .catch(error => signupValidator.response(res, 'error', 500, error));
  }
}

export default Users;
