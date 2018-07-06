import models from '../models';
import { restResponse } from '../util';

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
    return models.Centers.findOne({ where: { userId: req.decoded.id, id: centerId } }).then(
      found => {
        if (found) {
          return model.destroy({ where: { centerId } }).then(() =>
            model
              .bulkCreate(newFacilities, { validate: true })
              .then(() => restResponse(res, 'success', 200, newFacilities))
              .catch(error => restResponse(res, 'error', 500, error))
          );
          // .catch(error => restResponse(res, 'error', 500, error));
        }
        return restResponse(res, 'error', 403, 'Unauthorized transaction');
      }
    );
    // .catch(error => restResponse(res, 'error', 500, error));
  }
}
const facilityController = new Facilities();
export default facilityController;
