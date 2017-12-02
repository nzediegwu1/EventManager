﻿import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';
import faker from 'faker';

chai.use(chaiHttp);

describe('Tests for EventManager application', () => {
    describe('Tests for centerRouter response status codes', () => {
        it('Should test for addCenter 406 response status code', (done) => {
            chai.request(app)
              .post('/api/v1/centers')
              .send({
                  name: 'Woment Empowerment Hall',
                  address: 'Wuse Market place',
                  location: 'FCT, Abuja',
                  capacity: '34000',
                  price: '7000',
                  picture: 'image.jpg',
                  availability: 'open',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTUxMjIyNjY4MywiZXhwIjoxNTEyMzEzMDgzfQ.4oq4auyRIbYFmSCBzPoMz5-oijSRrlTvAteRtQUDwiw',
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
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTUxMjIyNjY4MywiZXhwIjoxNTEyMzEzMDgzfQ.4oq4auyRIbYFmSCBzPoMz5-oijSRrlTvAteRtQUDwiw',
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
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTEyMjI3MzQ2LCJleHAiOjE1MTIzMTM3NDZ9.QWeW-wkI5fHL9xpGEsahdh9IrpCsXxB3EqRscLyj_5Q',
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
              .put('/api/v1/centers/2')
              .send({
                  name: 'Andela Epic Tower',
                  address: 'Ikorodu Road',
                  location: 'Lagos',
                  capacity: '1000',
                  price: '25000',
                  availability: 'close',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTUxMjIyNzc0NiwiZXhwIjoxNTEyMzE0MTQ2fQ.JVVq_P0RPe1Y8lADfXYwPhppN59ZTPtEjLS30nBFTGY',
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
              .get('/api/v1/centers/2')
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
});
