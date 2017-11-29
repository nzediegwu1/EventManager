import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

chai.use(chaiHttp);

describe('Tests for EventRouter', () => {
    it('Should test for addEvents 201 response status code', (done) => {
        chai.request(app)
          .post('/api/v1/events')
          .send({
              title: 'Andela Bootcamp',
              date: 'March 21, 2010',
              time: '8:30',
              centerId: '2',
              description: 'A technology learning program',
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTExOTY5NDg2LCJleHAiOjE1MTIwNTU4ODZ9.Zzb7FBm42wiQJ7qNTyJyjecgg1lTj88lXqMEOzqWUZM',
          })
          .end((err, res) => {
              expect(res).to.have.status(201);
              done();
          });
    });
    /*
      it('Should test getEvents 200 response status code', (done) => {
          chai.request(app)
            .get('/api/v1/events')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
      });
    
      it('Should test modifyEvent 404 error response status code', (done) => {
          chai.request(app)
          .put('/api/v1/events/4')
            .send({
                title: 'Andela Bootcamp',
                date: 'March 21, 2012',
                time: '8:30',
                venue: 'Andela Epic Tower',
                description: 'A technology learning program',
            })
          .end((err, res) => {
              expect(res).to.have.status(404);
              done();
          });
      });
    
      it('Should test modifyEvent 202 success response status code', (done) => {
          chai.request(app)
            .put('/api/v1/events/0')
            .send({
                title: 'Andela Bootcamp',
                date: 'March 21, 2012',
                time: '8:30',
                venue: 'Andela Epic Tower',
                description: 'A technology learning program',
            })
            .end((err, res) => {
                expect(res).to.have.status(202);
                done();
            });
      });
  });
    
  describe('Tests for CenterRouter', () => {
      it('Should test for addCenter 201 response status code', (done) => {
          chai.request(app)
            .post('/api/v1/centers')
            .send({
                name: 'Eagle square',
                address: 'Ikorodu Road',
                location: 'Lagos',
                capacity: '1000',
                price: '25000',
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
      });
    
    
      it('Should test for addCenter 406 response status code', (done) => {
          chai.request(app)
            .post('/api/v1/centers')
            .send({
                name: 'Andela Epic Tower',
                address: 'Ikorodu Road',
                location: 'Lagos',
                capacity: '1000',
                price: '25000',
            })
            .end((err, res) => {
                expect(res).to.have.status(406);
                done();
            });
      });
    
      it('Should test for modifyCenter 200 response status code', (done) => {
          chai.request(app)
            .put('/api/v1/centers/0')
            .send({
                name: 'Andela Epic Tower',
                address: 'Ikorodu Road',
                location: 'Lagos',
                capacity: '1000',
                price: '25000',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
      });
      it('Should test for modifyCenter 404 response status code', (done) => {
          chai.request(app)
            .put('/api/v1/centers/9')
            .send({
                name: 'Andela Epic Tower',
                address: 'Ikorodu Road',
                location: 'Lagos',
                capacity: '1000',
                price: '25000',
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
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
            .get('/api/v1/centers/0')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
      });
      it('Should test for getCenterDetails 404 response status code', (done) => {
          chai.request(app)
            .get('/api/v1/centers/7')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
      });
    
      it('Should test for getCenterDetails for invalid parameter', (done) => {
          chai.request(app)
            .get('/api/v1/centers/fdf')
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
      }); */
});
