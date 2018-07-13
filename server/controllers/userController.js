import models from '../models';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import bcrypt from 'bcryptjs';
import faker from 'faker';
import cloudinary from 'cloudinary';
import isEmail from 'validator/lib/isEmail';
import {
  cloudinaryConfig,
  restResponse,
  invalidParameter,
  confirmParams,
  userEntry,
} from '../util';
import { findById, update, getAll, updateImmediate, updateAndEmail } from '../services';

cloudinary.config(cloudinaryConfig);
const key = process.env.SECRET_KEY;
const users = models.Users;
const attributes = { exclude: ['password'] };

class Users {
  signUp(req, res) {
    const { username, email, phoneNo } = req.body;
    const phoneValue = phoneNo.substring(1);
    return users
      .findAll({ where: { $or: [{ username }, { email }, { phoneNo: phoneValue }, { id: 1 }] } })
      .then(members => {
        let accountType;
        const first = members[0];
        if (members.length === 0) {
          accountType = 'super';
        } else if (
          members.length > 1 ||
          first.username === username ||
          first.email === email ||
          first.phoneNo === phoneValue
        ) {
          const message = 'Username, email or phone_number already in use';
          return restResponse(res, 'err', 409, message);
        }
        const newUser = userEntry(req);
        newUser.accountType = accountType || 'regular';
        return users
          .create(newUser)
          .then(createdUser => {
            /* eslint-disable */
            createdUser.password = undefined;
            const token = jwt.sign({ id: createdUser.id }, key, {
              expiresIn: 60 * 60 * 24,
            });
            return restResponse(res, 'success', 201, {
              User: createdUser,
              Token: token,
            });
          })
          .catch(error => restResponse(res, 'error', 500, error));
      });
    // .catch(error => restResponse(res, 'error', 500, error));
  }

  signIn(req, res) {
    return users.findOne({ where: { username: req.body.username } }).then(loggedInUser => {
      if (loggedInUser) {
        if (bcrypt.compareSync(req.body.password, loggedInUser.password)) {
          const token = jwt.sign({ id: loggedInUser.id }, key, {
            expiresIn: 60 * 60 * 24,
          });
          loggedInUser.password = undefined; // block password
          return restResponse(res, 'success', 200, {
            User: loggedInUser,
            Token: token,
          });
        }
        return restResponse(res, 'err', 401, 'Invalid Login Details');
      }
      return restResponse(res, 'err', 404, 'User not found');
    });
    // .catch(err => restResponse(res, 'err', 500, err));
  }

  getUsers(req, res) {
    const userId = req.decoded.id;
    if (userId === 1) {
      return getAll(req, res, users, [['name', 'ASC']], null, null, attributes);
    }
    return restResponse(res, 'error', 401, 'You do not have access to this resource!');
  }

  getUserProfile(req, res) {
    if (confirmParams(req, res) === true) {
      return findById(req, res, users, req.params, attributes, null);
    }
    return invalidParameter;
  }

  modifyProfile(req, res) {
    const userId = req.decoded.id;
    const { username, email, phoneNo } = req.body;
    return users.findById(userId, { attributes }).then(user => {
      if (!user) {
        return restResponse(res, 'error', 404, 'User not found');
      }
      const phoneValue = phoneNo.substring(1);
      return users
        .findAll({
          where: { id: { $ne: userId }, $or: [{ username }, { email }, { phoneNo: phoneValue }] },
        })
        .then(members => {
          if (members.length !== 0) {
            const message = 'Username, email or phone_number already in use';
            return restResponse(res, 'err', 409, message);
          }
          const profileData = userEntry(req);
          return updateImmediate(req, res, users, user, profileData, null, attributes);
        });
      // .catch(error => restResponse(res, 'error', 500, error));
    });
  }

  upgradeAccount(req, res) {
    if (confirmParams(req, res) === true) {
      const requester = req.decoded.id;
      const userId = parseInt(req.params.id, 10);
      const accountType = req.query.accountType;
      if (requester === 1 && userId !== 1) {
        if (accountType === 'admin' || accountType === 'regular') {
          return update(req, res, users, { accountType }, { id: userId }, attributes);
        }
        return restResponse(res, 'error', 400, 'AccountType must be [admin] or [regular]');
      }
      return restResponse(res, 'error', 403, 'Not authorized to perform action');
    }
    return invalidParameter;
  }

  changeProfilePic(req, res) {
    const { picture, publicId } = req.body;
    const condition = { id: req.decoded.id };
    return update(req, res, users, { picture, publicId }, condition, attributes);
  }

  recoverPassword(req, res) {
    const { email } = req.body;
    if (typeof email === 'string' && isEmail(email)) {
      return users.findOne({ where: { email } }).then(foundUser => {
        if (!foundUser) {
          return restResponse(res, 'error', 404, 'User not found');
        }
        const newPassword = faker.internet.password(10, false);
        const data = { password: bcrypt.hashSync(newPassword, 10) };
        const text = `Dear ${foundUser.name},
          \nYour new password is: ${newPassword}. Kindly login to https://eventmanageronline.herokuapp.com and change your password!
          \nBest Regards,\nAdmin`;
        return updateAndEmail(foundUser, res, text, email, data, 'Email Recovery');
      });
      // .catch(error => restResponse(res, 'error', 500, error));
    }
    return restResponse(res, 'error', 400, 'Invalid email entry');
  }
}

export default Users;
