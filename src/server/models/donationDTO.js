class DonationDTO {
  /** @type {number} */
  donationId;

  /** @type {string} */
  donationName;

  /** @type {number} */
  donationSum;

  /**
   * @param {Donation|null} donationORM
   */
  constructor(donationORM = null) {
    this.donationId = donationORM?.donationId;
    this.donationName = donationORM?.donationName;
    this.donationSum = donationORM?.donationSum;
  }
}

module.exports = DonationDTO;

/**
 * @swagger
 * components:
 *   schemas:
 *     Donation:
 *       type: object
 *       properties:
 *         donationId:
 *           type: integer
 *           description: Id of the donation
 *         donationName:
 *           type: string
 *           description: Donation author's name
 *         donationSum:
 *           type: integer
 *           description: The sum of the donation
 */
