class InfoShelterDTO {
  /** @type {string} */
  shelter_address;

  /** @type {string} */
  shelter_phone;

  /** @type {string} */
  shelter_email;

  /**
   * @param {InfoShelter|null} infoShelterORM
   */
  constructor(infoShelterORM = null) {
    this.shelter_address = infoShelterORM?.shelter_address;
    this.shelter_phone = infoShelterORM?.shelter_phone;
    this.shelter_email = infoShelterORM?.shelter_email;
  }
}

module.exports = InfoShelterDTO;
