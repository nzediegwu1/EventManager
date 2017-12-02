import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';
import faker from 'faker';

chai.use(chaiHttp);

describe('Tests for EventManager application', () => {
    describe('Tests for for UserRouter', () => {
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
                  phoneNo: '070503943430',
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
                  username: 'nzediegwu1',
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
    describe('Tests for CenterRouter', () => {
        it('Should test for addCenter 406 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/centers')
              .send({
                  name: 'Eagle square ultimate',
                  address: 'Ikorodu Road',
                  location: 'Lagos',
                  capacity: '1000',
                  price: '25000',
                  picture: 'image.jpg',
                  availability: 'close',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
              .end((err, res) => {
                  expect(res).to.have.status(406);
                  done();
              });
        });
        it('Should test for addCenter 201 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/centers')
              .send({
                  name: faker.name.firstName(),
                  address: faker.address.streetAddress(),
                  location: faker.address.city(),
                  capacity: `${faker.random.number()}`,
                  price: `${faker.random.number()}`,
                  picture: 'image.jpg',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
              .end((err, res) => {
                  expect(res).to.have.status(201);
                  done();
              });
        });

        it('Should test for addCenter 403 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/centers')
              .send({
                  name: faker.name.firstName(),
                  address: faker.address.streetAddress(),
                  location: faker.address.city(),
                  capacity: `${faker.random.number()}`,
                  price: `${faker.random.number()}`,
                  picture: 'image.jpg',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTEyMTY1ODY1LCJleHAiOjE1MTIyNTIyNjV9.aVquiWS6ki2CZeuyiuLbbcTcvhwS-JYIKX2CtYUbpMQ',
              })
              .end((err, res) => {
                  expect(res).to.have.status(403);
                  done();
              });
        });

        it('Should test for addCenter 500 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/centers')
              .send({
                  name: faker.name.firstName(),
                  address: faker.address.streetAddress(),
                  location: faker.address.city(),
                  capacity: faker.random.number(), // when use raw number instead of number in string form
                  price: faker.random.number(), // when use raw number instead of number in string form
                  picture: 'image.jpg',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
              .end((err, res) => {
                  expect(res).to.have.status(500);
                  done();
              });
        });


        it('Should test for modifyCenter 202 response status code', (done) => {
            chai.request(app)
              .put('/api/v1/centers/6')
              .send({
                  name: 'Andela Epic Tower',
                  address: 'Ikorodu Road',
                  location: 'Lagos',
                  capacity: '1000',
                  price: '25000',
                  availability: 'close',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
              .end((err, res) => {
                  expect(res).to.have.status(202);
                  done();
              });
        });

        it('Should test for modifyCenter 403 response status code', (done) => {
            chai.request(app)
              .put('/api/v1/centers/3')
              .send({
                  name: 'Andela Epic Tower',
                  address: 'Ikorodu Road',
                  location: 'Lagos',
                  capacity: '1000',
                  price: '25000',
                  availability: 'close',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
              .end((err, res) => {
                  expect(res).to.have.status(403);
                  done();
              });
        });
        it('Should test for getAllCenters 200 response status code', (done) => {
            chai.request(app)
              .get('/api/v1/centers')
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  done();
              });
        });
        it('Should test for getCenterDetails 200 response status code', (done) => {
            chai.request(app)
              .get('/api/v1/centers/6')
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  done();
              });
        });
        it('Should test for getCenterDetails 404 response status code', (done) => {
            chai.request(app)
              .get('/api/v1/centers/77')
              .end((err, res) => {
                  expect(res).to.have.status(404);
                  done();
              });
        });
    });
    describe('Tests for EventRouter', () => {
        it('Should test for addEvents 201 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/events')
              .send({
                  title: faker.name.title(),
                  date: `${faker.date.past().toDateString()}`,
                  time: '8:30',
                  centerId: '3',
                  description: 'A technology learning program',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
              .end((err, res) => {
                  expect(res).to.have.status(201);
                  done();
              });
        });
        it('Should test for addEvents 406 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/events')
              .send({
                  title: faker.name.title(),
                  date: 'Wed Nov 22 2017',
                  time: '17:30',
                  centerId: '4',
                  description: 'A technology learning program',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
              .end((err, res) => {
                  expect(res).to.have.status(406);
                  done();
              });
        });
        it('Should test for addEvents 400 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/events')
              .send({
                  title: faker.name.title(),
                  date: 'Wed Nov 22 2017',
                  time: '17:30',
                  centerId: `${faker.random.number()}`,
                  description: 'A technology learning program',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
              .end((err, res) => {
                  expect(res).to.have.status(400);
                  done();
              });
        });
        it('Should test modifyEvent 406 error response status code', (done) => {
            chai.request(app)
            .put('/api/v1/events/4')
              .send({
                  title: faker.name.title(),
                  date: 'Wed Nov 22 2017',
                  time: '17:30',
                  centerId: '4',
                  description: 'A technology learning program',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
            .end((err, res) => {
                expect(res).to.have.status(406);
                done();
            });
        });
        it('Should test modifyEvent 202 error response status code', (done) => {
            chai.request(app)
            .put('/api/v1/events/19')
              .send({
                  title: faker.name.title(),
                  date: `${faker.date.past().toDateString()}`,
                  time: '17:30',
                  centerId: '4',
                  description: 'A technology learning program',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
            .end((err, res) => {
                expect(res).to.have.status(202);
                done();
            });
        });
        it('Should test modifyEvent 403 error response status code', (done) => {
            chai.request(app)
            .put('/api/v1/events/999')
              .send({
                  title: faker.name.title(),
                  date: `${faker.date.past().toDateString()}`,
                  time: '17:30',
                  centerId: '4',
                  description: 'A technology learning program',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
            });
        });
        it('Should test for modifyEvent 400 response status code', (done) => {
            chai.request(app)
              .put('/api/v1/events/19')
              .send({
                  title: faker.name.title(),
                  date: 'Wed Nov 22 2017',
                  time: '17:30',
                  centerId: `${faker.random.number()}`,
                  description: 'A technology learning program',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTEyMTM3NDEyLCJleHAiOjE1MTIyMjM4MTJ9.q2BhHpIVCvUmvSrGpu2xioHdlCOmoly67R747BqbAbM',
              })
              .end((err, res) => {
                  expect(res).to.have.status(400);
                  done();
              });
        });

        it('Should test getEvents 200 response status code', (done) => {
            chai.request(app)
              .get('/api/v1/events')
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  done();
              });
        });
    });
});
