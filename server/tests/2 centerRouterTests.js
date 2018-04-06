import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { userToken, adminToken } from './1 userRouterTests';
import app from '../app';
import faker from 'faker';

chai.use(chaiHttp);
/*
describe('Tests for EventManager application\n', () => {
  describe('Tests for centerRouter\n', () => {
    it('Should test for addCenter 406 response', (done) => {
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
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.message).to.include('Same center already exists');
          done();
        });
    });
    it('Should test for addCenter 201 response', (done) => {
      chai.request(app)
        .post('/api/v1/centers')
        .send({
          name: faker.name.firstName(),
          address: faker.address.streetAddress(),
          location: faker.address.city(),
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'image.jpg',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.have.property('availability').to.include('open');
          done();
        });
    });
    it('Should test for addCenter 403 response', (done) => {
      chai.request(app)
        .post('/api/v1/centers')
        .send({
          name: faker.name.firstName(),
          address: faker.address.streetAddress(),
          location: faker.address.city(),
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'image.jpg',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message').to.include('Only an admin can perform this action');
          done();
        });
    });
    it('Should test for addCenter 500 response', (done) => {
      chai.request(app)
        .post('/api/v1/centers')
        .send({
          name: faker.name.firstName(),
          address: faker.address.streetAddress(),
          location: faker.address.city(),
          capacity: faker.random.number(), // when use raw number instead of number in string form
          price: faker.random.number(), // when use raw number instead of number in string form
          picture: 'image.jpg',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('Should test for modifyCenter 202 response', (done) => {
      chai.request(app)
        .put('/api/v1/centers/2')
        .send({
          name: 'Yaba Metropolitan Center',
          address: 'Ikorodu Road',
          location: 'Lagos',
          capacity: '12000',
          price: '7500',
          picture: 'yaba metro.jpg',
          availability: 'open',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res.body).to.have.property('data').to.include('Update successful');
          done();
        });
    });
    it('Should test for modifyCenter 403 response (unauthorized item)', (done) => {
      chai.request(app)
        .put('/api/v1/centers/1')
        .send({
          name: faker.name.firstName(),
          address: faker.address.streetAddress(),
          location: faker.address.city(),
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'image.jpg',
          availability: 'close',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message').to.include('Attempt to update unexisting or unauthorized item');
          done();
        });
    });
    it('Should test for modifyCenter 403 response (unexisting item)', (done) => {
      chai.request(app)
        .put(`/api/v1/centers/${faker.random.number()}`)
        .send({
          name: faker.name.firstName(),
          address: faker.address.streetAddress(),
          location: faker.address.city(),
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'image.jpg',
          availability: 'close',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message').to.include('Attempt to update unexisting or unauthorized item');
          done();
        });
    });
    it('Should test for modifyCenter 406 response', (done) => {
      chai.request(app)
        .put('/api/v1/centers/1')
        .send({
          name: 'Yaba Metropolitan Center',
          address: 'Ikorodu Road',
          location: 'Lagos',
          capacity: '12000',
          price: '7500',
          picture: 'yaba metro.jpg',
          availability: 'close',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.have.property('message').to.include('Same center already exists');
          done();
        });
    });
    it('Should test for modifyCenter Invalid parameter', (done) => {
      chai.request(app)
        .put('/api/v1/centers/wizzy')
        .send({
          name: 'Yaba Metropolitan Center',
          address: 'Ikorodu Road',
          location: 'Lagos',
          capacity: '12000',
          price: '7500',
          picture: 'yaba metro.jpg',
          availability: 'close',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').to.include('invalid parameter');
          done();
        });
    });
    it('Should test for getAllCenters 200 response', (done) => {
      chai.request(app)
        .get('/api/v1/centers')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
    it('Should test for getCenterDetails 200 response', (done) => {
      chai.request(app)
        .get('/api/v1/centers/2')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
    it('Should test for getCenterDetails 404 response status code', (done) => {
      chai.request(app)
        .get(`/api/v1/centers/${faker.random.number()}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').to.include('Could not find Center');
          done();
        });
    });
    it('Should test for getCenterDetails invalid parameter', (done) => {
      chai.request(app)
        .get('/api/v1/centers/orange')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').to.include('invalid parameter');
          done();
        });
    });
  });
});
*/
