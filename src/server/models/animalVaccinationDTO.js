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
        if (animalVaccinationORM.vaccinationVaccinationId != vaccinationORM.vaccinationId) {
            throw new Error(`
            animalVaccinationORM.vaccinationVaccinationId (${animalVaccinationORM.vaccinationVaccinationId}) 
            should be equal to vaccinationORM.vaccinationId (${vaccinationORM.vaccinationId})`)
        } else {
            this.vaccinationId = vaccinationORM?.vaccinationId;
            this.vaccinationName = vaccinationORM?.vaccinationName;
            this.vaccinationDate = animalVaccinationORM?.vaccinationDate;
        }
    }
}

module.exports = AnimalVaccinationDTO

