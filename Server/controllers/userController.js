import models from '../models';
import val from '../middlewares/validator';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import bcrypt from 'bcryptjs';


const key = process.env.SECRET_KEY;
const signupValidator = new val('users', 'signup');
const signinValidator = new val('users', 'signin');

const users = models.Users;
class Users {
  signUp(req, res) {
    return users.findAll()
        .then(members => {
          if (members.length !== 0) {
            for (let item in members) {
              // if username/email already exists
              if (members[item].username === req.body.username
                  || members[item].email === req.body.email) {
                // unacceptable
                return signupValidator.response(res, 'err', 406, 'User already exists');
              }
            }
          }
          // create new user
          const { username, name, email, phoneNo, accountType, password } = req.body;
                
          return users.create({ username, name, email, phoneNo, accountType,
            password: bcrypt.hashSync(password, 10) })
              .then(createdUser => {
                const newUser = { username, name, email, accountType, phoneNo: parseFloat(phoneNo) };
                const token = jwt.sign({ id: createdUser.id }, key, {
                  expiresIn: 60 * 60 * 24 });
                return signupValidator.response(res, 'success', 201, {
                  User: newUser,
                  Token: token,
                });
              })
              .catch(error => signupValidator.response(res, 'error', 500, error));
        }).catch(error => signupValidator.response(res, 'error', 500, error));
  }
  signIn(req, res) {
    return users.findOne({ where: { username: req.body.username } })
        .then(loggedInUser => {
          if (bcrypt.compareSync(req.body.password, loggedInUser.password)) {
            const token = jwt.sign({ id: loggedInUser.id }, key, {
              expiresIn: 60 * 60 * 24 });
            return signinValidator.response(res, 'success', 200, {
              User: loggedInUser,
              Token: token,
            });
          }
          return signinValidator.response(res, 'err', 401, 'Invalid Login Details');
        })
        .catch(error => signinValidator.response(res, 'err', 404, 'User not found'));
  }
  getUsers(req, res) {
    // gets all users' details excluding password
    return users.findAll({ attributes: { exclude: ['password'] } })
        .then(allusers => signupValidator.response(res, 'success', 200, allusers))
        .catch(error => signupValidator.response(res, 'error', 500, error));
  }
}

export default Users;
