import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';
import faker from 'faker';
import { centerTests } from './center.tests';

chai.use(chaiHttp);
export let adminToken;
export let userToken;
export let superAdminToken;

/* eslint-disable */
export function userTests() {
  const regularPhone = '+2348089340098';
  const adminPhone = '+2347067256519';
  describe('Tests for for userRouter\n', () => {
    it('Should test for superAdmin signup', done => {
      chai
        .request(app)
        .post('/api/v1/users')
        .send({
          username: 'nzediegwu1',
          name: 'Anaeze Nsoffor',
          email: 'nzediegwu1@gmail.com',
          phoneNo: adminPhone,
          password: 'password1',
          confirmPassword: 'password1',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('Token');
          expect(res.body.data.User)
            .to.have.property('accountType')
            .to.include('super');
          superAdminToken = res.body.data.Token;
          expect(res).to.have.status(201);
          done();
        });
    });
    it('Should test for regular user signup (future admin)', done => {
      chai
        .request(app)
        .post('/api/v1/users')
        .send({
          username: 'anaeze',
          name: faker.name.firstName(),
          email: faker.internet.email(),
          phoneNo: regularPhone,
          password: 'password1',
          confirmPassword: 'password1',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('User')
            .that.does.not.have.property('password');
          expect(res.body.data.User)
            .to.have.property('accountType')
            .to.include('regular');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('Token');
          done();
        });
    });
    it('Should test for regular user signup', done => {
      chai
        .request(app)
        .post('/api/v1/users')
        .send({
          username: faker.internet.userName(),
          name: faker.name.firstName(),
          email: faker.internet.email(),
          phoneNo: '+2348084327829',
          password: 'password1',
          confirmPassword: 'password1',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('User')
            .that.does.not.have.property('password');
          expect(res.body.data.User)
            .to.have.property('accountType')
            .to.include('regular');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('Token');
          userToken = res.body.data.Token;
          done();
        });
    });
    it('Should test for "existing user" signup error: same username', done => {
      chai
        .request(app)
        .post('/api/v1/users')
        .send({
          username: 'nzediegwu1',
          name: faker.name.firstName(),
          email: faker.internet.email(),
          phoneNo: '+2348086340098',
          password: 'password1',
          confirmPassword: 'password1',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('Username, email or phone_number already in use');
          done();
        });
    });
    it('Should test for "existing user" signup error: same email', done => {
      chai
        .request(app)
        .post('/api/v1/users')
        .send({
          username: faker.internet.userName(),
          name: faker.name.firstName(),
          email: 'nzediegwu1@gmail.com',
          phoneNo: '+2347089340098',
          password: 'password1',
          confirmPassword: 'password1',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('Username, email or phone_number already in use');
          done();
        });
    });
    it('Should test for "existing user" signup error: same phoneNo', done => {
      chai
        .request(app)
        .post('/api/v1/users')
        .send({
          username: faker.internet.userName(),
          name: faker.name.firstName(),
          email: faker.internet.email(),
          phoneNo: adminPhone,
          password: 'password1',
          confirmPassword: 'password1',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('Username, email or phone_number already in use');
          done();
        });
    });
    it('Should test for successful login', done => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          username: 'nzediegwu1',
          password: 'password1',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('User')
            .that.does.not.have.property('password');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('Token');
          done();
        });
    });
    it('Should test for invalid login details error', done => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          username: 'nzediegwu1',
          password: 'password2',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('Invalid Login Details');
          done();
        });
    });
    it('Should test for "user not found" login error', done => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          username: faker.internet.userName(),
          password: 'password2',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('User not found');
          done();
        });
    });
    it('Should test for getUsers 200 response', done => {
      chai
        .request(app)
        .get(`/api/v1/users/?token=${superAdminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.have.property('data')
            .that.has.property('data')
            .which.is.an('array');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('count')
            .which.is.a('number');
          done();
        });
    });
    it('Should test for getUsers unauthorized response (not superAdmin)', done => {
      chai
        .request(app)
        .get(`/api/v1/users/?token=${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('You do not have access to this resource!');
          done();
        });
    });
    it('Should test for getUsers unauthorized response (no token provided)', done => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('Unauthorized');
          done();
        });
    });
    it('Should test for getUsers forbidden response (invalid token provided)', done => {
      chai
        .request(app)
        .get(`/api/v1/users/?token=${userToken}jkdjf`)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('Token could not be authenticated');
          done();
        });
    });
    it('Should test for getUserProfile success', done => {
      chai
        .request(app)
        .get('/api/v1/users/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.have.property('data')
            .that.does.not.have.property('password');
          done();
        });
    });
    it('Should test for getUserProfile not found error', done => {
      chai
        .request(app)
        .get('/api/v1/users/999')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('Could not find item');
          done();
        });
    });
    it('Should test for getUserProfile invalid parameter error', done => {
      chai
        .request(app)
        .get('/api/v1/users/bhsdf')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('invalid parameter');
          done();
        });
    });
    it('Should test for modifyProfile success', done => {
      chai
        .request(app)
        .put(`/api/v1/users/?token=${superAdminToken}`)
        .send({
          username: 'nzediegwu1',
          name: 'Anaeze Nsoffor',
          email: 'nzediegwu1@gmail.com',
          phoneNo: '+2347067256519',
          password: 'password1',
          confirmPassword: 'password1',
          company: 'Andela',
          website: 'http://wwww.anaeze.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res.body)
            .to.have.property('data')
            .that.does.not.have.property('password');
          expect(res.body.data)
            .to.have.property('company')
            .to.include('Andela');
          done();
        });
    });
    it('Should test for modifyProfile (email/phone/username) already existing error)', done => {
      chai
        .request(app)
        .put(`/api/v1/users/?token=${superAdminToken}`)
        .send({
          username: 'nzediegwu1',
          name: 'Anaeze Nsoffor',
          email: 'nzediegwu1@gmail.com',
          phoneNo: regularPhone,
          password: 'password1',
          confirmPassword: 'password1',
          company: 'Andela',
          website: 'http://wwww.anaeze.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('Username, email or phone_number already in use');
          done();
        });
    });
    it('Should test for upgrade account success', done => {
      const newAccountType = 'admin';
      chai
        .request(app)
        .put(`/api/v1/users/2/upgrade/?accountType=${newAccountType}&token=${superAdminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res.body)
            .to.have.property('data')
            .that.does.not.have.property('password');
          expect(res.body.data)
            .to.have.property('accountType')
            .to.include(newAccountType);
          done();
        });
    });
    it('Should test for successful login of new admin', done => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          username: 'anaeze',
          password: 'password1',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('User')
            .that.does.not.have.property('password');
          expect(res.body.data.User)
            .to.have.property('accountType')
            .to.include('admin');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('Token');
          adminToken = res.body.data.Token;
          done();
        });
    });
    it('Should test for upgrade account forbidden error (unpermitted action)', done => {
      chai
        .request(app)
        .put(`/api/v1/users/2/upgrade/?accountType=admin&token=${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('Not authorized to perform action');
          done();
        });
    });
    it('Should test for upgrade account 400 error (invalid input)', done => {
      chai
        .request(app)
        .put(`/api/v1/users/2/upgrade/?accountType=fire&token=${superAdminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('AccountType must be [admin] or [regular]');
          done();
        });
    });
    it('Should test for upgrade account Invalid parameter error', done => {
      chai
        .request(app)
        .put(`/api/v1/users/dshsjdf/upgrade/?accountType=admin&token=${superAdminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('status')
            .to.include('error');
          expect(res.body)
            .to.have.property('message')
            .to.include('invalid parameter');
          done();
        });
    });
    it('Should test for profile image upload success', done => {
      const picture = 'https://res.cloudinary.com/1530194717304-elizade%20plaza.jpg.jpg';
      const publicId = 'dev/centers/1530194717304-elizade plaza.jpg';
      chai
        .request(app)
        .put(`/api/v1/users/changePic/?token=${superAdminToken}`)
        .send({ picture, publicId })
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res.body)
            .to.have.property('data')
            .that.does.not.have.property('password');
          expect(res.body.data)
            .to.have.property('picture')
            .to.include(picture);
          done();
        });
    });
    it('Should test for password recovery success', done => {
      const email = 'nzediegwu1@gmail.com';
      chai
        .request(app)
        .post('/api/v1/users/password')
        .send({ email })
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res.body)
            .to.have.property('data')
            .to.include('New password has been sent to your email!');
          done();
        });
    });
    it('Should test for password recovery "user not found" error', done => {
      const email = faker.internet.email();
      chai
        .request(app)
        .post('/api/v1/users/password')
        .send({ email })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.have.property('message')
            .to.include('User not found');
          done();
        });
    });
    it('Should test for password recovery invalid entry error', done => {
      const email = 'fakercdternedsdail';
      chai
        .request(app)
        .post('/api/v1/users/password')
        .send({ email })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('message')
            .to.include('Invalid email entry');
          done();
        });
    });
  });
  centerTests();
}
