const { Donation } = require("../models/modelsORM");
const DonationDTO = require("../models/donationDTO");

class DonationController {
  async add(req, res) {
    const { donationName, donationSum } = req.body;
    const { donationId } = req.body;

    const donationORM = await Donation.create({
      donationId,
      donationName,
      donationSum,
    });

    const donationDTO = new DonationDTO(donationORM);
    return res.json(donationDTO);
  }
}

module.exports = new DonationController();
