const AnimalVaccinationDTO = require('./animalVaccinationDTO')

class AnimalDTO {
    /** @type {number} */
    animalId;
    /** @type {string} */
    animalType;
    /** @type {string} */
    animalName;
    /** @type {string} */
    animalSex;
    /** @type {number} */
    animalAge;
    /** @type {string} */
    animalHistory;
    /** @type {string} */
    animalBreed;
    /** @type {string} */
    animalImg;
    /** @type {AnimalVaccinationDTO[]} */
    animalVaccinationsList; 
    /** @type {boolean} */
    deleteFlag;

    /**
    * @param {Animal|null} animalORM
    */
    /**
    * @param {Vaccination[]|null} vaccinationsORM
    */
    /**
    * @param {AnimalVaccination[]|null} animalVaccinationsORM
    */
    constructor(animalORM = null, vaccinationsORM = [], animalVaccinationsORM = []) {
        this.animalId = animalORM?.animalId;
        this.animalType = animalORM?.animalType;
        this.animalName = animalORM?.animalName;
        this.animalSex = animalORM?.animalSex;
        this.animalAge = animalORM?.animalAge;
        this.animalHistory = animalORM?.animalHistory;
        this.animalBreed = animalORM?.animalBreed;
        this.animalImg = animalORM?.animalImg;
        this.deleteFlag = animalORM?.deleteFlag;

        this.animalVaccinationsList = []
        if (vaccinationsORM.length != animalVaccinationsORM.length) {
            throw new Error(`AnimalID: ${this.animalId}: 
            vaccinationsORM.length should be equal to animalVaccinationsORM.length`)
        }
        for (let i = 0; i < vaccinationsORM.length; i++) {
            this.animalVaccinationsList.push(
                new AnimalVaccinationDTO(vaccinationsORM[i], animalVaccinationsORM[i]))
        };
    }
}

module.exports = AnimalDTO
