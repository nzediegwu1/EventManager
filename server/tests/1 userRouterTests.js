import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';
import faker from 'faker';

chai.use(chaiHttp);
export let adminToken;
export let userToken;
/*
describe('Tests for EventManager application\n', () => {
  describe('Tests for for userRouter\n', () => {
    it('Should test for existing user signup', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          username: 'nzediegwu1',
          name: 'Anaeze Nsoffor',
          email: 'nzediegwu1@gmail.com',
          phoneNo: '2347067256519',
          accountType: 'admin', // ['admin' or 'regular']
          password: 'password1',
          confirmPassword: 'password1',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(406);
          done();
        });
    });
    it('Should test for new user signup', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          username: faker.internet.userName(),
          name: faker.name.firstName(),
          email: faker.internet.email(),
          phoneNo: '70503943430',
          accountType: 'regular',
          password: 'password1',
          confirmPassword: 'password1',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data').that.does.not.have.property('password');
          expect(res.body).to.have.property('data').that.has.property('Token');
          userToken = res.body.data.Token;
          console.log(`userToken: ${  userToken }`);
          done();
        });
    });
    it('Should test for user signin 200 response', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          username: 'nzediegwu1',
          password: 'password1',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data').that.does.not.have.property('password');
          expect(res.body).to.have.property('data').that.has.property('Token');
          adminToken = res.body.data.Token;
          console.log(`adminToken: ${ adminToken }`);
          done();
        });
    });
    it('Should test for signin 401 response', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          username: 'nzediegwu1',
          password: 'password2',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.include('Invalid Login Details');
          done();
        });
    });
    it('Should test for signin 404 response', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          username: faker.internet.userName(),
          password: 'password2',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').to.include('User not found');
          done();
        });
    });
    it('Should test for getUsers 200 response', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
*/
