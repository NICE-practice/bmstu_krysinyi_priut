const { Donation } = require("../models/modelsORM");
const DonationDTO = require("../models/donationDTO");
const ApiError = require("../errors/ApiError");

class DonationController {
  async add(req, res, next) {
    const { donationName, donationSum } = req.body;
    const { donationId } = req.body;

    try {
      const donationORM = await Donation.create({
        donationId,
        donationName,
        donationSum,
      });

      const donationDTO = new DonationDTO(donationORM);
      return res.json(donationDTO);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }
}

module.exports = new DonationController();
