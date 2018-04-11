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
              parseFloat(members[item].phoneNo) === req.body.phoneNo
            ) {
              // unacceptable
              return signupValidator.response(res, 'err', 406, 'User already exists');
            }
          }
        }
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
    const userId = req.decoded.id;
    if (userId === 1) {
      return users
        .findAll({ attributes: { exclude: ['password'] } })
        .then(allusers => {
          if (allusers.length > 0) {
            return signinValidator.response(res, 'success', 200, allusers);
          }
          return signinValidator.response(res, 'error', 404, 'No user found');
        })
        .catch(error => signinValidator.response(res, 'error', 500, error));
    }
    return signinValidator.response(res, 'error', 403, 'You do not have access to this resource!');
  }
  getUserProfile(req, res) {
    if (signinValidator.confirmParams(req, res) === true) {
      const userId = parseInt(req.params.id, 10);
      return users
        .findById(userId, { attributes: { exclude: ['password'] } })
        .then(userDetails => {
          if (userDetails !== null) {
            return signinValidator.response(res, 'success', 200, userDetails);
          }
          return signinValidator.response(res, 'error', 404, 'User not found');
        })
        .catch(error => signinValidator.response(res, 'error', 500, error));
    }
    return signinValidator.invalidParameter;
  }
  modifyProfile(req, res) {
    if (signinValidator.confirmParams(req, res) === true) {
      const userId = parseInt(req.params.id, 10);
      const { username, name, email, company, website, street, city, state, password } = req.body;
      const phoneNo = parseFloat(req.body.phoneNo);
      return users.findById(userId).then(user => {
        if (user !== null) {
          return users
            .findAll()
            .then(userDetails => {
              for (const item in userDetails) {
                if (userDetails[item].id !== userId) {
                  if (userDetails[item].username === username) {
                    return signupValidator.response(res, 'err', 406, 'Username already exists');
                  } else if (userDetails[item].email === email) {
                    return signupValidator.response(res, 'err', 406, 'Email already exists');
                  } else if (parseFloat(userDetails[item].phoneNo) === phoneNo) {
                    return signupValidator.response(res, 'err', 406, 'Phone No already exists');
                  }
                }
              }
              return user
                .updateAttributes({
                  username,
                  name,
                  email,
                  phoneNo,
                  company,
                  website,
                  street,
                  city,
                  state,
                  password: bcrypt.hashSync(password, 10),
                })
                .then(updatedUser =>
                  users
                    .findById(updatedUser.id, { attributes: { exclude: ['password'] } })
                    .then(response => signinValidator.response(res, 'success', 201, response))
                    .catch(error => signinValidator.response(res, 'error', 500, error))
                );
            })
            .catch(error => signinValidator.response(res, 'error', 500, error));
        }
        return signinValidator.response(res, 'error', 404, 'User not found');
      });
    }
    return signinValidator.invalidParameter;
  }
}

export default Users;
