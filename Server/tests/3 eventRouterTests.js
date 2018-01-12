import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { userToken, adminToken } from './1 userRouterTests';
import app from '../app';
import faker from 'faker';

chai.use(chaiHttp);
describe('Tests for EventManager application\n', () => {
  describe('Tests for eventRouter response status codes\n', () => {
    let eventToDelete;
    it('Should test for addEvents 201 response', (done) => {
      chai.request(app)
        .post('/api/v1/events')
        .send({
          title: faker.name.title(),
          date: 'Wed Nov 22 2018',
          time: '17:30',
          centerId: '1',
          description: 'A technology learning program',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          eventToDelete = res.body.data.id;
          // console.log(`event to delete: ${eventToDelete}`);
          done();
        });
    });
    it('Should test for addEvents 406 response', (done) => {
      chai.request(app)
        .post('/api/v1/events')
        .send({
          title: faker.name.title(),
          date: 'Wed Nov 22 2018',
          time: '17:30',
          centerId: '1',
          description: 'A technology learning program',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.message).to.have.property('Sorry').to.contain('Selected date is already occupied for centerId: 1');
          expect(res.body.message.OccupiedDates).to.be.an('array');
          done();
        });
    });
    it('Should test for addEvents 400 response', (done) => {
      chai.request(app)
        .post('/api/v1/events')
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
          expect(res.body.message).to.contain('centerId selected for event does not exist in table');
          done();
        });
    });
    it('Should test for modifyEvent 406 response', (done) => {
      chai.request(app)
        .put('/api/v1/events/1')
        .send({
          title: faker.name.title(),
          date: 'Wed Nov 22 2018',
          time: '17:30',
          centerId: '1',
          description: 'A technology learning program',
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.message).to.have.property('Sorry').to.contain('Selected date is already occupied for centerId: 1');
          expect(res.body.message.OccupiedDates).to.be.an('array');
          done();
        });
    });
    it('Should test modifyEvent 202 error response status code', (done) => {
      chai.request(app)
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
        expect(res).to.have.status(202);
        expect(res.body.data).to.contain('Update successful');
        done();
      });
    });
    it('Should test modifyEvent 403 error response (unexising item)', (done) => {
      chai.request(app)
      .put(`/api/v1/events/${faker.random.number()}`)
        .send({
          title: faker.name.title(),
          date: `${faker.date.future().toDateString()}`,
          time: '17:30',
          centerId: '2',
          description: 'A technology learning program',
          token: adminToken,
        })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message').to.include('Attempt to update unexisting or unauthorized item');
        done();
      });
    });
    it('Should test modifyEvent 403 error response (unauthorized item)', (done) => {
      chai.request(app)
      .put('/api/v1/events/1')
        .send({
          title: faker.name.title(),
          date: `${faker.date.future().toDateString()}`,
          time: '17:30',
          centerId: '2',
          description: 'A technology learning program',
          token: userToken,
        })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message').to.include('Attempt to update unexisting or unauthorized item');
        done();
      });
    });
    it('Should test for modifyEvent 400 response status', (done) => {
      chai.request(app)
        .put('/api/v1/events/1')
        .send({
          title: faker.name.title(),
          date: `${faker.date.future().toDateString()}`,
          time: '17:30',
          centerId: `${faker.random.number()}`,
          description: 'A technology learning program',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.include('centerId selected for event does not exist in table');
          done();
        });
    });
    it('Should test for modifyEvent Invalid parameter', (done) => {
      chai.request(app)
        .put('/api/v1/events/wizzy')
        .send({
          title: faker.name.title(),
          date: `${faker.date.future().toDateString()}`,
          time: '17:30',
          centerId: `${faker.random.number()}`,
          description: 'A technology learning program',
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').to.include('invalid parameter');
          done();
        });
    });
    it('Should test deleteEvents 200 response status code', (done) => {
      chai.request(app)
        .delete(`/api/v1/events/${eventToDelete}`)
          .send({
            token: userToken,
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.contain('Successfully deleted');
            done();
          });
    });
    it('Should test deleteEvents 400 response (unexisting event)', (done) => {
      chai.request(app)
        .delete(`/api/v1/events/${faker.random.number()}`)
        .send({
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.contain('Invalid transaction');
          done();
        });
    });
    it('Should test deleteEvents 400 response (unauthorized action)', (done) => {
      chai.request(app)
        .delete('/api/v1/events/1')
        .send({
          token: userToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.contain('Invalid transaction');
          done();
        });
    });
    it('Should test for deleteEvent Invalid parameter', (done) => {
      chai.request(app)
        .delete('/api/v1/events/wizzy')
        .send({
          token: adminToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').to.include('invalid parameter');
          done();
        });
    });
    it('Should test getEvents 200 response', (done) => {
      chai.request(app)
        .get('/api/v1/events')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });
});
