import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';
import faker from 'faker';

chai.use(chaiHttp);

describe('Tests for EventManager application', () => {
    /*
    describe('Tests for eventRouter response status codes', () => {
        it('Should test for addEvents 201 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/events')
              .send({
                  title: faker.name.title(),
                  date: `${faker.date.future().toDateString()}`,
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
                  date: `${faker.date.future().toDateString()}`,
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
                  date: `${faker.date.future().toDateString()}`,
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
    */
});
