import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

// const {expect} = chai;
const expect = chai.expect;

chai.use(chaiHttp);

describe('Test for EventRouter', () => {
    // Test for undefined routes
    it('Should test addEvents', (done) => {
        chai.request(app)
          .post('/api/v1/events')
          .send({ random: 'random' })
          .end((err, res) => {
              expect(res).to.have.status(400);
              done();
          });
    });
    it('Should test getEvents', (done) => {
        chai.request(app)
          .get('/api/v1/events')
          .end((err, res) => {
              expect(res).to.have.status(200);
              done();
          });
    });
    it('Should test modifyEvent', (done) => {
        chai.request(app)
          .put('/api/v1/events')
          .send({ random: 'random' })
          .end((err, res) => {
              expect(res).to.have.status(404);
              done();
          });
    });
});
