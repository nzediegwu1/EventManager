import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { userToken, adminToken } from './user.tests';
import { eventTests } from './event.tests';
import app from '../app';
import faker from 'faker';

chai.use(chaiHttp);

/* eslint-disable */
export function centerTests() {
  describe('Tests for centerRouter\n', () => {
    it('Should test for getAllCenters not-found response', done => {
      chai
        .request(app)
        .get('/api/v1/centers/?pageNumber=1&limit=8')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.have.property('message')
            .to.include('No resource available');
          done();
        });
    });
    it('Should test for addCenter success response', done => {
      chai
        .request(app)
        .post('/api/v1/centers')
        .send({
          name: 'Millenium stadium',
          address: '22 Kings Village',
          location: 'Lekki Island, Lagos',
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          availability: 'open',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data)
            .to.have.property('user')
            .that.has.property('accountType')
            .to.include('admin');
          done();
        });
    });
    it('Should test for addCenter success response (second center)', done => {
      const centerName = 'Yaba Metropolitan Center';
      chai
        .request(app)
        .post('/api/v1/centers')
        .send({
          name: centerName,
          address: 'Ikorodu Road',
          location: 'Lagos',
          capacity: '12000',
          price: '7500',
          picture: 'yabametro.jpg',
          publicId: 'dev/centers/yabametro',
          availability: 'close',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data)
            .to.have.property('name')
            .to.include('Yaba Metropolitan Center');
          done();
        });
    });

    it('Should test for addCenter forbidden error response', done => {
      chai
        .request(app)
        .post('/api/v1/centers')
        .send({
          name: faker.name.firstName(),
          address: faker.address.streetAddress(),
          location: faker.address.city(),
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          availability: 'open',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body)
            .to.have.property('message')
            .to.include('Only an admin can perform this action');
          done();
        });
    });
    it('Should test for addCenter invalid image response', done => {
      chai
        .request(app)
        .post('/api/v1/centers')
        .send({
          name: faker.name.firstName(),
          address: faker.address.streetAddress(),
          location: faker.address.city(),
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'centerimage',
          publicId: 'dev/centers/youth_dev_auditorium',
          availability: 'open',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('message')
            .to.include('Invalid picture');
          done();
        });
    });
    it('Should test for addCenter duplicate error', done => {
      chai
        .request(app)
        .post('/api/v1/centers')
        .send({
          name: 'Millenium stadium',
          address: '22 Kings Village',
          location: 'Lekki Island, Lagos',
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          availability: 'open',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body)
            .to.have.property('message')
            .to.include('Same center already exists');
          done();
        });
    });
    it('Should test for modifyCenter success response', done => {
      const centerName = 'Millenium stadium International';
      chai
        .request(app)
        .put('/api/v1/centers/1')
        .send({
          name: centerName,
          address: '22 Kings Village',
          location: 'Lekki Island, Lagos',
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          availability: 'open',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res.body.data)
            .to.have.property('user')
            .that.has.property('username')
            .to.include('anaeze');
          expect(res.body.data)
            .to.have.property('name')
            .to.include(centerName);
          done();
        });
    });
    it('Should test for modifyCenter 403 response (unauthorized action)', done => {
      const centerName = 'Millenium International Hall';
      chai
        .request(app)
        .put('/api/v1/centers/1')
        .send({
          name: centerName,
          address: '22 Kings Village',
          location: 'Lekki Island, Lagos',
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          availability: 'open',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body)
            .to.have.property('message')
            .to.include('Unexisting or unauthorized item');
          done();
        });
    });
    it('Should test for modifyCenter 403 response (unexisting item)', done => {
      chai
        .request(app)
        .put(`/api/v1/centers/${faker.random.number()}`)
        .send({
          name: faker.name.firstName(),
          address: faker.address.streetAddress(),
          location: faker.address.city(),
          capacity: `${faker.random.number()}`,
          price: `${faker.random.number()}`,
          picture: 'image.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          availability: 'close',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body)
            .to.have.property('message')
            .to.include('Unexisting or unauthorized item');
          done();
        });
    });
    it('Should test for modifyCenter Invalid parameter error', done => {
      chai
        .request(app)
        .put('/api/v1/centers/wizzy')
        .send({
          name: 'Yaba Metropolitan Center',
          address: 'Ikorodu Road',
          location: 'Lagos',
          capacity: '12000',
          price: '7500',
          picture: 'image.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          availability: 'close',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('message')
            .to.include('invalid parameter');
          done();
        });
    });
    it('Should test for modifyCenter duplicate error', done => {
      chai
        .request(app)
        .put('/api/v1/centers/1')
        .send({
          name: 'Yaba Metropolitan Center',
          address: 'Ikorodu Road',
          location: 'Lagos',
          capacity: '12000',
          price: '7500',
          picture: 'yabametro.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          availability: 'close',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body)
            .to.have.property('message')
            .to.include('Same center already exists');
          done();
        });
    });
    it('Should test for getAllCenters success response', done => {
      chai
        .request(app)
        .get('/api/v1/centers')
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
    it('Should test for getCenterDetails success response', done => {
      chai
        .request(app)
        .get('/api/v1/centers/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data)
            .to.have.property('events')
            .which.is.an('array');
          done();
        });
    });
    it('Should test for getCenterDetails 404 response', done => {
      chai
        .request(app)
        .get(`/api/v1/centers/${faker.random.number()}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.have.property('message')
            .to.include('Could not find item');
          done();
        });
    });
    it('Should test for getCenterDetails invalid parameter', done => {
      chai
        .request(app)
        .get('/api/v1/centers/orange')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('message')
            .to.include('invalid parameter');
          done();
        });
    });
  });
  eventTests();
}
