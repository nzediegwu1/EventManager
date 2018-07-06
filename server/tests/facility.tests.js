import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { userToken, adminToken } from './user.tests';
import app from '../app';

/* eslint-disable */
chai.use(chaiHttp);
export function facilityTests() {
  describe('Tests for facilityRouter\n', () => {
    const data = [
      {
        name: 'fish',
        spec: 'golden',
        quantity: 6,
      },
    ];
    it('Should test for addFacilities success response', done => {
      chai
        .request(app)
        .post(`/api/v1/facilities/1?token=${adminToken}`)
        .send({
          data: JSON.stringify({ content: data }),
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.have.property('data')
            .which.is.an('array');
          expect(res.body.data[0]).to.be.an('object');
          done();
        });
    });
    it('Should test for addFacilities 403 response (unauthorized user)', done => {
      chai
        .request(app)
        .post(`/api/v1/facilities/1?token=${userToken}`)
        .send({
          data: JSON.stringify({ content: data }),
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body)
            .to.have.property('message')
            .to.contain('Unauthorized transaction');
          done();
        });
    });
    it('Should test for addFacilities 403 response (unexisting center)', done => {
      chai
        .request(app)
        .post(`/api/v1/facilities/9999?token=${adminToken}`)
        .send({
          data: JSON.stringify({ content: data }),
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body)
            .to.have.property('message')
            .to.contain('Unauthorized transaction');
          done();
        });
    });
  });
}
