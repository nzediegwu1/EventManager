import models from '../models';
import Val from '../middlewares/validator';

const validator = new Val('facilities');
const model = models.Facilities;

class Facilities {
  addFacility(req, res) {
    const reqBody = JSON.parse(req.body.data);
    const centerId = req.params.centerId;
    const newFacilities = reqBody.content.map(facility => ({
      name: facility.name,
      spec: facility.spec,
      quantity: facility.quantity,
      centerId,
    }));
    return models.Centers.findOne({ where: { userId: req.decoded.id, id: centerId } })
      .then(() =>
        model.destroy({ where: { centerId } }).then(() =>
          model.bulkCreate(newFacilities, { validate: true }).then(() =>
            model
              .findAll()
              .then(facilities => validator.response(res, 'success', 200, facilities))
              .catch(error => validator.response(res, 'error', 500, error))
          )
        )
      )
      .catch((error) => validator.response(res, 'error', 403, error));
  }
}
const facilityController = new Facilities();
export default facilityController;
