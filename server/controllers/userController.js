import models from '../models';
import Val from '../middlewares/validator';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';
import nodemailer from 'nodemailer';
import faker from 'faker';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

cloudinary.config({
  cloud_name: 'eventmanager',
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});

const key = process.env.SECRET_KEY;
const signupValidator = new Val('users', 'signup');
const signinValidator = new Val('users', 'signin');
const profilePicValidator = new Val('users', 'changePic');

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
      const rawPage = req.query.pageNumber;
      const rawLimit = req.query.limit;
      const page = isNaN(rawPage) || !rawPage ? 1 : parseInt(rawPage, 10);
      const limit = isNaN(rawLimit) || !rawLimit ? 5 : parseInt(req.query.limit, 10);
      return users.findAndCountAll().then(data => {
        const count = data.count;
        const pages = Math.ceil(count / limit);
        const offset = page > pages ? (pages - 1) * limit : (page - 1) * limit;
        return users
          .findAll({
            attributes: { exclude: ['password'] },
            offset,
            limit,
            order: [['name', 'ASC']],
          })
          .then(allusers => {
            if (allusers.length > 0) {
              return signinValidator.response(res, 'success', 200, allusers);
            }
            return signinValidator.response(res, 'error', 404, 'No user found');
          })
          .catch(error => signinValidator.response(res, 'error', 500, error));
      });
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
    const userId = req.decoded.id;
    const { username, name, email, company, website, address, password } = req.body;
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
                address,
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
  upgradeAccount(req, res) {
    if (signinValidator.confirmParams(req, res) === true) {
      const requester = req.decoded.id;
      const userId = parseInt(req.params.id, 10);
      const accountType = req.query.accountType;
      if (requester === 1 && userId !== 1) {
        if (accountType === 'admin' || accountType === 'regular') {
          return users
            .findById(userId, { attributes: { exclude: ['password'] } })
            .then(user => {
              if (user !== null) {
                return user
                  .updateAttributes({ accountType })
                  .then(updatedUser => signinValidator.response(res, 'success', 200, updatedUser))
                  .catch(error => signinValidator.response(res, 'error', 500, error));
              }
              return signinValidator.response(res, 'error', 404, 'User not found');
            })
            .catch(err => signinValidator.response(res, 'error', 500, err));
        }
        return signinValidator.response(
          res,
          'error',
          400,
          'AccountType must be [admin] or [regular]'
        );
      }
      return signinValidator.response(res, 'error', 403, 'Cannot perform this action');
    }
    return signinValidator.invalidParameter;
  }
  changeProfilePic(req, res) {
    const { picture, publicId } = req.body;
    const userId = req.decoded.id;
    let picToDelete;
    return users
      .findById(userId, { attributes: { exclude: ['password'] } })
      .then(user => {
        picToDelete = user.publicId;
        if (user !== null) {
          return user
            .updateAttributes({ picture, publicId })
            .then(updatedUser => {
              cloudinary.v2.uploader.destroy(picToDelete);
              return profilePicValidator.response(res, 'success', 200, updatedUser);
            })
            .catch(error => profilePicValidator.responseWithCloudinary(req, res, 500, error));
        }
        return profilePicValidator.responseWithCloudinary(req, res, 404, 'User not found');
      })
      .catch(err => profilePicValidator.responseWithCloudinary(req, res, 500, err));
  }
  recoverPassword(req, res) {
    const email = req.body.email;
    if (email && typeof email === 'string' && email.length > 5) {
      return users
        .findOne({ where: { email } })
        .then(foundUser => {
          if (foundUser) {
            const newPassword = faker.internet.password(10, false);
            return foundUser
              .updateAttributes({ password: bcrypt.hashSync(newPassword, 10) })
              .then(() => {
                const mailOption = {
                  from: 'eventmgronline@gmail.com',
                  to: email,
                  subject: 'Email Recovery',
                  text: `Dear ${
                    foundUser.name
                  },\n\nYour new password is: ${newPassword}. Kindly login to https://eventmanageronline.herokuapp.com and change your password!\n\nBest Regards,\nAdmin`,
                };
                transporter.sendMail(mailOption);
                const message = 'New password has been sent to your email!';
                return signinValidator.response(res, 'success', 200, message);
              });
          }
          return signinValidator.response(res, 'error', 404, 'User not found');
        })
        .catch(error => signinValidator.response(res, 'error', 500, error));
    }
    return signinValidator.response(res, 'error', 400, 'Invalid email entry');
  }
}

export default Users;
