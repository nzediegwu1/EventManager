import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';
import faker from 'faker';

chai.use(chaiHttp);

describe('Tests for EventManager application', () => {
    describe('Tests for for userRouter response status codes', () => {
        it('Should test for signup 406 response status code', (done) => {
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
                  expect(res).to.have.status(406);
                  done();
              });
        });
        it('Should test for signup 201 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/users')
              .send({
                  username: faker.internet.userName(),
                  name: faker.name.firstName(),
                  email: faker.internet.email(),
                  phoneNo: '70503943430',
                  accountType: 'regular', // ['admin' or 'regular']
                  password: 'password1',
                  confirmPassword: 'password1',
              })
              .end((err, res) => {
                  expect(res).to.have.status(201);
                  done();
              });
        });
        it('Should test for signin 200 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/users/login')
              .send({
                  username: 'ohams',
                  password: 'password1',
              })
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  done();
              });
        });
        it('Should test for signin 401 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/users/login')
              .send({
                  username: 'nzediegwu1',
                  password: 'password2',
              })
              .end((err, res) => {
                  expect(res).to.have.status(401);
                  done();
              });
        });
        it('Should test for signin 404 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/users/login')
              .send({
                  username: faker.internet.userName(),
                  password: 'password2',
              })
              .end((err, res) => {
                  expect(res).to.have.status(404);
                  done();
              });
        });
        it('Should test for getUsers 200 response status code', (done) => {
            chai.request(app)
              .get('/api/v1/users')
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  done();
              });
        });
    });
});
