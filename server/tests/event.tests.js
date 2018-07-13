import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { userToken, adminToken } from './user.tests';
import { facilityTests } from './facility.tests';
import app from '../app';
import faker from 'faker';

/* eslint-disable */
chai.use(chaiHttp);
export function eventTests() {
  describe('Tests for eventRouter\n', () => {
    let eventToDelete;
    it('Should test for getAllEvents not-found response', done => {
      chai
        .request(app)
        .get('/api/v1/events/?pageNumber=1&limit=8')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.have.property('message')
            .to.equal('No resource available');
          done();
        });
    });
    it('Should test for addEvents success response', done => {
      const description = 'A technology learning program';
      chai
        .request(app)
        .post('/api/v1/events')
        .send({
          title: faker.name.title(),
          date: 'August 17, 2019',
          time: '17:30',
          description,
          picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          centerId: '1',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body)
            .to.have.property('data')
            .that.has.property('description')
            .to.equal(description);
          expect(res.body.data)
            .to.have.property('center')
            .that.has.property('name')
            .to.equal('Millenium stadium International');
          eventToDelete = res.body.data.id;
          done();
        });
    });
    it('Should test for addEvents success response (second event)', done => {
      const picture = 'https://api.cloudinary.com/Youth_developm_auditorium.jpg';
      chai
        .request(app)
        .post('/api/v1/events')
        .send({
          title: faker.name.title(),
          date: 'August 18, 2019',
          time: '17:30',
          description: 'A technology learning program',
          picture,
          publicId: 'dev/centers/youth_dev_auditorium',
          centerId: '1',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body)
            .to.have.property('data')
            .that.has.property('picture')
            .to.equal(picture);
          expect(res.body.data)
            .to.have.property('center')
            .that.has.property('name')
            .to.equal('Millenium stadium International');
          done();
        });
    });
    it('Should test for addEvents success response (Third event)', done => {
      const publicId = 'dev/centers/youth_dev_auditorium';
      chai
        .request(app)
        .post('/api/v1/events')
        .send({
          title: faker.name.title(),
          date: 'August 28, 2019',
          time: '17:30',
          description: 'A technology learning program',
          picture: 'https://api.cloudinary.com/Youth_enhancement_confab.jpg',
          publicId,
          centerId: '1',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body)
            .to.have.property('data')
            .that.has.property('publicId')
            .to.equal(publicId);
          expect(res.body.data)
            .to.have.property('center')
            .that.has.property('name')
            .to.equal('Millenium stadium International');
          done();
        });
    });

    it('Should test for addEvents error: center already occupied for specified date', done => {
      chai
        .request(app)
        .post('/api/v1/events')
        .send({
          title: faker.name.title(),
          date: 'August 17, 2019',
          time: '12:30',
          description: 'A technology learning program',
          picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          centerId: '1',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message)
            .to.have.property('Sorry')
            .to.contain('Selected date is already occupied for selected center');
          expect(res.body.message)
            .to.have.property('OccupiedDates')
            .which.is.an('array');
          done();
        });
    });
    it('Should test for addEvents 409 response (selected center unavailable)', done => {
      chai
        .request(app)
        .post('/api/v1/events')
        .send({
          title: faker.name.title(),
          date: 'August 17, 2019',
          time: '12:30',
          description: 'A technology learning program',
          picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          centerId: '2',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body)
            .to.have.property('message')
            .to.contain('Selected center is unavailable');
          done();
        });
    });
    it('Should test for addEvents 400 response (center does not exist)', done => {
      chai
        .request(app)
        .post('/api/v1/events')
        .send({
          title: faker.name.title(),
          date: `${faker.date.future().toDateString()}`,
          time: '17:30',
          description: 'A technology learning program',
          centerId: `${faker.random.number()}`,
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('message')
            .to.contain('Center selected does not exist');
          done();
        });
    });
    it('Should test modifyEvent 202 success response', done => {
      const newTitle = faker.name.title();
      chai
        .request(app)
        .put('/api/v1/events/2')
        .send({
          title: newTitle,
          date: 'August 20, 2019',
          time: '17:30',
          centerId: '1',
          description: 'A technology learning program',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res.body)
            .to.have.property('data')
            .that.has.property('title')
            .to.equal(newTitle);
          expect(res.body.data)
            .to.have.property('center')
            .that.has.property('availability')
            .to.equal('open');
          done();
        });
    });
    it('Should test for modifyEvent 409 error response (occupied center)', done => {
      chai
        .request(app)
        .put('/api/v1/events/2')
        .send({
          title: faker.name.title(),
          date: 'August 17, 2019',
          time: '17:30',
          description: 'A technology learning program',
          centerId: '1',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message)
            .to.have.property('Sorry')
            .to.contain('Selected date is already occupied for selected center');
          expect(res.body.message)
            .to.have.property('OccupiedDates')
            .which.is.an('array');
          done();
        });
    });
    it('Should test modifyEvent 403 error response (unexising item)', done => {
      chai
        .request(app)
        .put(`/api/v1/events/${faker.random.number()}`)
        .send({
          title: faker.name.title(),
          date: `${faker.date.future().toDateString()}`,
          time: '17:30',
          centerId: '1',
          description: 'A technology learning program',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body)
            .to.have.property('message')
            .to.equal('Unexisting or unauthorized item');
          done();
        });
    });
    it('Should test modifyEvent 403 error response (unauthorized item)', done => {
      chai
        .request(app)
        .put('/api/v1/events/1')
        .send({
          title: faker.name.title(),
          date: `${faker.date.future().toDateString()}`,
          time: '17:30',
          centerId: '1',
          description: 'A technology learning program',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body)
            .to.have.property('message')
            .to.equal('Unexisting or unauthorized item');
          done();
        });
    });
    it('Should test for modifyEvent 400 response (unexisting center selected)', done => {
      chai
        .request(app)
        .put('/api/v1/events/1')
        .send({
          title: faker.name.title(),
          date: `${faker.date.future().toDateString()}`,
          time: '17:30',
          centerId: `${faker.random.number()}`,
          description: 'A technology learning program',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('message')
            .to.equal('Center selected does not exist');
          done();
        });
    });
    it('Should test for modifyEvent Invalid parameter', done => {
      chai
        .request(app)
        .put('/api/v1/events/wizzy')
        .send({
          title: faker.name.title(),
          date: `${faker.date.future().toDateString()}`,
          time: '17:30',
          centerId: `${faker.random.number()}`,
          description: 'A technology learning program',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('message')
            .to.equal('invalid parameter');
          done();
        });
    });
    it('Should test deleteEvents 200 response status code', done => {
      chai
        .request(app)
        .delete(`/api/v1/events/${eventToDelete}`)
        .send({
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.equal('Successfully deleted');
          done();
        });
    });
    it('Should confirm event was deleted', done => {
      chai
        .request(app)
        .get(`/api/v1/events/${eventToDelete}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.have.property('message')
            .to.equal('Could not find item');
          done();
        });
    });
    it('Should test deleteEvents 401 response (unexisting event)', done => {
      chai
        .request(app)
        .delete(`/api/v1/events/${faker.random.number()}`)
        .send({
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body)
            .to.have.property('message')
            .to.equal('Cannot delete unexisting or unauthorized item');
          done();
        });
    });
    it('Should test deleteEvents 401 response (unauthorized action)', done => {
      chai
        .request(app)
        .delete('/api/v1/events/2')
        .send({
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body)
            .to.have.property('message')
            .to.equal('Cannot delete unexisting or unauthorized item');
          done();
        });
    });
    it('Should test for deleteEvent Invalid parameter', done => {
      chai
        .request(app)
        .delete('/api/v1/events/wizzy')
        .send({
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('message')
            .to.equal('invalid parameter');
          done();
        });
    });
    it('Should test getEvents 200 response', done => {
      chai
        .request(app)
        .get('/api/v1/events')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.have.property('data')
            .that.has.property('data')
            .which.is.an('array');
          expect(res.body)
            .to.have.property('data')
            .that.has.property('count')
            .which.is.a('number')
            .that.equals(2)
          done();
        });
    });
    it('Should test for getEventDetails success response', done => {
      chai
        .request(app)
        .get('/api/v1/events/2')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data)
            .to.have.property('center')
            .which.is.an('object');
          expect(res.body.data)
            .to.have.property('user')
            .which.is.an('object');
          done();
        });
    });
    it('Should test for getEventDetails 404 response', done => {
      chai
        .request(app)
        .get(`/api/v1/events/${faker.random.number()}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.have.property('message')
            .to.equal('Could not find item');
          done();
        });
    });
    it('Should test for getEventDetails invalid parameter', done => {
      chai
        .request(app)
        .get('/api/v1/events/orange')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property('message')
            .to.equal('invalid parameter');
          done();
        });
    });
    it('Should test approveEvent success response', done => {
      const newStatus = 'rejected';
      chai
        .request(app)
        .put('/api/v1/events/approve/2')
        .send({
          status: newStatus,
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res.body.data)
            .to.have.property('status')
            .to.equal(newStatus);
          expect(res.body.data)
            .to.have.property('user')
            .which.is.an('object');
          done();
        });
    });
    it('Should test approveEvent no-priviledge error response', done => {
      const newStatus = 'rejected';
      chai
        .request(app)
        .put('/api/v1/events/approve/2')
        .send({
          status: newStatus,
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body)
            .to.have.property('message')
            .to.equal('No priviledge to approve event');
          done();
        });
    });
    it('Should test approveEvent not found error response', done => {
      const newStatus = 'approved';
      chai
        .request(app)
        .put(`/api/v1/events/approve/${faker.random.number()}`)
        .send({
          status: newStatus,
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.have.property('message')
            .to.equal('Event does not exist');
          done();
        });
    });
    // Third event
    it('Should be able to create new event in same center and date of rejected event', done => {
      chai
        .request(app)
        .post('/api/v1/events')
        .send({
          title: faker.name.title(),
          date: 'August 20, 2019',
          time: '17:30',
          description: 'A social learning program',
          picture: 'https://api.cloudinary.com/Youth_developm_auditorium.jpg',
          publicId: 'dev/centers/youth_dev_auditorium',
          centerId: '1',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body)
            .to.have.property('data')
            .that.has.property('center')
            .that.has.property('name')
            .to.equal('Millenium stadium International');
          done();
        });
    });
    it('Should prevent center owner from approving when date is taken', done => {
      const newStatus = 'approved';
      chai
        .request(app)
        .put('/api/v1/events/approve/2')
        .send({
          status: newStatus,
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message)
            .to.have.property('Sorry')
            .to.contain('Selected date is already occupied for selected center');
          expect(res.body.message)
            .to.have.property('OccupiedDates')
            .which.is.an('array');
          done();
        });
    });
  });
  facilityTests();
}
