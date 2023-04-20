/**
 * @swagger
 * components:
 *   schemas:
 *     AnimalVaccination:
 *       type: object
 *       required:
 *         - vaccinationName
 *       properties:
 *         vaccinationId:
 *           type: integer
 *           description: Id of the vaccination
 *         vaccinationName:
 *           type: string
 *           description: Vaccination name
 *         vaccinationDate:
 *           type: string
 *           description: When the vaccination was made
 */

class AnimalVaccinationDTO {
  /** @type {number} */
  vaccinationId;

  /** @type {string} */
  vaccinationName;

  /** @type {Date} */
  vaccinationDate;

  /**
   * @param {AnimalVaccination|null} animalVaccinationORM
   */
  /**
   * @param {Vaccination|null} vaccinationORM
   */
  constructor(vaccinationORM = null, animalVaccinationORM = null) {
    if (
      animalVaccinationORM.vaccinationVaccinationId !==
      vaccinationORM.vaccinationId
    ) {
      throw new Error(`
            animalVaccinationORM.vaccinationVaccinationId (${animalVaccinationORM.vaccinationVaccinationId}) 
            should be equal to vaccinationORM.vaccinationId (${vaccinationORM.vaccinationId})`);
    } else {
      this.vaccinationId = vaccinationORM?.vaccinationId;
      this.vaccinationName = vaccinationORM?.vaccinationName;
      this.vaccinationDate = animalVaccinationORM?.vaccinationDate;
    }
  }
}

module.exports = AnimalVaccinationDTO;
