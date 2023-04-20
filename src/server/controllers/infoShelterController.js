const { InfoShelter } = require("../models/modelsORM");
const ApiError = require("../errors/ApiError");
const InfoShelterDTO = require("../models/infoShelterDTO");

class InfoShelterController {
  async get(req, res, next) {
    const infoShelterORM = await InfoShelter.findOne();

    try {
      const infoShelterDTO = new InfoShelterDTO(infoShelterORM);
      return res.json(infoShelterDTO);
    } catch (err) {
      return next(ApiError.internal(err.infoShelter));
    }
  }
}

module.exports = new InfoShelterController();
