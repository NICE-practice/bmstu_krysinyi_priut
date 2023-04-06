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
