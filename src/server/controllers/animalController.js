const {
  Animal,
  Vaccination,
  AnimalVaccination,
} = require("../models/modelsORM");
const ApiError = require("../errors/ApiError");
const AnimalDTO = require("../models/animalDTO");

class AnimalController {
  static async build_animalDTO_by_animalORM(animalORM) {
    const { animalId } = animalORM;
    const animalVaccinationsORM = await AnimalVaccination.findAll({
      where: { animalAnimalId: animalId },
    });
    const vaccinationsORM = [];
    for (const animalVaccinationORM of animalVaccinationsORM) {
      const vaccinationORM = await Vaccination.findByPk(
        animalVaccinationORM.vaccinationVaccinationId
      );
      vaccinationsORM.push(vaccinationORM);
    }

    try {
      const animalDTO = new AnimalDTO(
        animalORM,
        vaccinationsORM,
        animalVaccinationsORM
      );
      return animalDTO;
    } catch (err) {
      throw ApiError.internal(err.message);
    }
  }

  async add(req, res, next) {
    const {
      animalType,
      animalName,
      animalSex,
      animalAge,
      animalHistory,
      animalBreed,
      animalImg,
      deleteFlag,
      vaccinationsList, // name, date=null
    } = req.body;
    let { animalId } = req.body;

    const vaccinationsORM = [];
    for (const vaccination of vaccinationsList) {
      const { vaccinationName } = vaccination;
      const vaccinationORM = await Vaccination.findOne({
        where: { vaccinationName },
      });

      if (vaccinationORM) {
        vaccinationsORM.push(vaccinationORM);
      } else {
        next(
          ApiError.badRequest(
            `Vaccination with vaccinationName=${vaccinationName} does not exist`
          )
        );
        return;
      }
    }

    const animalORM = await Animal.create({
      animalId,
      animalType,
      animalName,
      animalSex,
      animalAge,
      animalHistory,
      animalBreed,
      animalImg,
      deleteFlag,
    });
    animalId = animalORM.animalId;

    const animalVaccinationsORM = [];

    for (let i = 0; i < vaccinationsList.length; i++) {
      const { vaccinationDate } = vaccinationsList[i];
      const { vaccinationId } = vaccinationsORM[i];

      const animalVaccinationORM = AnimalVaccination.build({
        vaccinationVaccinationId: vaccinationId,
        animalAnimalId: animalId,
        vaccinationDate,
      });
      animalVaccinationsORM.push(animalVaccinationORM);
    }

    try {
      for (const animalVaccinationORM of animalVaccinationsORM) {
        await animalVaccinationORM.save();
      }

      const animalDTO = await AnimalController.build_animalDTO_by_animalORM(
        animalORM
      );
      return res.json(animalDTO);
    } catch (err) {
      await Animal.destroy({ where: animalId });
      return next(ApiError.internal(err.message));
    }
  }

  async getList(req, res, next) {
    const { animalBreed, animalType, animalName } = req.query;
    let { animalAge, limit, page } = req.query;
    const { onlyNotDeleted } = req.query;
    if (animalAge === 0) {
      animalAge = null;
    }

    page = page || 1;
    limit = limit || 9;
    const offset = page * limit - limit;

    let animalsORM;
    let animalsCount;
    if (onlyNotDeleted === "true") {
      if (!animalBreed && !animalType && !animalAge) {
        const { count, rows } = await Animal.findAndCountAll({
          where: { deleteFlag: false },
          limit,
          offset,
        });
        animalsORM = rows;
        animalsCount = count;
      }
      if (!animalBreed && !animalType && animalAge) {
        const { count, rows } = await Animal.findAndCountAll({
          where: { deleteFlag: false, animalAge },
          limit,
          offset,
        });
        animalsORM = rows;
        animalsCount = count;
      }
      if (!animalBreed && animalType && !animalAge) {
        const { count, rows } = await Animal.findAndCountAll({
          where: { deleteFlag: false, animalType },
          limit,
          offset,
        });
        animalsORM = rows;
        animalsCount = count;
      }
      if (animalBreed && !animalType && !animalAge) {
        const { count, rows } = await Animal.findAndCountAll({
          where: { deleteFlag: false, animalBreed },
          limit,
          offset,
        });
        animalsORM = rows;
        animalsCount = count;
      }
      if (!animalBreed && animalType && animalAge) {
        const { count, rows } = await Animal.findAndCountAll({
          where: { deleteFlag: false, animalType, animalAge },
          limit,
          offset,
        });
        animalsORM = rows;
        animalsCount = count;
      }
      if (animalBreed && animalType && !animalAge) {
        const { count, rows } = await Animal.findAndCountAll({
          where: { deleteFlag: false, animalBreed, animalType },
          limit,
          offset,
        });
        animalsORM = rows;
        animalsCount = count;
      }
      if (animalBreed && !animalType && animalAge) {
        const { count, rows } = await Animal.findAndCountAll({
          where: { deleteFlag: false, animalBreed, animalAge },
          limit,
          offset,
        });
        animalsORM = rows;
        animalsCount = count;
      }
      if (animalBreed && animalType && animalAge) {
        const { count, rows } = await Animal.findAndCountAll({
          where: { deleteFlag: false, animalBreed, animalType, animalAge },
          limit,
          offset,
        });
        animalsORM = rows;
        animalsCount = count;
      }
      if (animalName) {
        const { count, rows } = await Animal.findAndCountAll({
          where: { deleteFlag: false, animalName },
          limit,
          offset,
        });
        animalsORM = rows;
        animalsCount = count;
      }
    } else {
      const { count, rows } = await Animal.findAndCountAll({ limit, offset });
      animalsORM = rows;
      animalsCount = count;
    }
    if (!animalsORM) {
      return next(ApiError.badRequest(`Animals with parameters do not exist`));
    }
    try {
      const animalsDTO = [];
      for (const animalORM of animalsORM) {
        const animalDTO = await AnimalController.build_animalDTO_by_animalORM(
          animalORM
        );
        animalsDTO.push(animalDTO);
      }
      return res.json({ animals: animalsDTO, animalsCount });
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async getById(req, res, next) {
    const { animalId } = req.params;

    const animalORM = await Animal.findByPk(animalId);
    if (!animalORM) {
      return next(
        ApiError.badRequest(`Animal with animalId=${animalId} does not exist`)
      );
    }

    try {
      const animalDTO = await AnimalController.build_animalDTO_by_animalORM(
        animalORM
      );
      return res.json(animalDTO);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async deleteById(req, res, next) {
    const { animalId } = req.params;
    const animalORM = await Animal.findByPk(animalId);
    if (!animalORM) {
      return next(
        ApiError.badRequest(`Animal with animalId=${animalId} does not exist`)
      );
    }

    animalORM.deleteFlag = true;
    await animalORM.save();
    const animalDTO = await AnimalController.build_animalDTO_by_animalORM(
      animalORM
    );
    return res.json(animalDTO);
  }

  async updateById(req, res, next) {
    let { animalId } = req.params;
    const {
      animalType,
      animalName,
      animalSex,
      animalAge,
      animalHistory,
      animalBreed,
      animalImg,
      deleteFlag,
      vaccinationsList, // name, date=null
    } = req.body;

    req.body.animalId = animalId;

    // return this.add(req, res, next)
    const vaccinationsORM = [];
    for (const vaccination of vaccinationsList) {
      const { vaccinationName } = vaccination;
      const vaccinationORM = await Vaccination.findOne({
        where: { vaccinationName },
      });

      if (vaccinationORM) {
        vaccinationsORM.push(vaccinationORM);
      } else {
        next(
          ApiError.badRequest(
            `Vaccination with vaccinationName=${vaccinationName} does not exist`
          )
        );
        return;
      }
    }

    let animalORM = await Animal.findByPk(animalId);

    if (animalORM) {
      await Animal.destroy({ where: { animalId } });
    }

    animalORM = await Animal.create({
      animalId,
      animalType,
      animalName,
      animalSex,
      animalAge,
      animalHistory,
      animalBreed,
      animalImg,
      deleteFlag,
    });
    animalId = animalORM.animalId;

    const animalVaccinationsORM = [];

    for (let i = 0; i < vaccinationsList.length; i++) {
      const { vaccinationDate } = vaccinationsList[i];
      const { vaccinationId } = vaccinationsORM[i];

      const animalVaccinationORM = AnimalVaccination.build({
        vaccinationVaccinationId: vaccinationId,
        animalAnimalId: animalId,
        vaccinationDate,
      });
      animalVaccinationsORM.push(animalVaccinationORM);
    }

    try {
      for (const animalVaccinationORM of animalVaccinationsORM) {
        await animalVaccinationORM.save();
      }

      const animalDTO = await AnimalController.build_animalDTO_by_animalORM(
        animalORM
      );
      return res.json(animalDTO);
    } catch (err) {
      await Animal.destroy({ where: animalId });
      return next(ApiError.internal(err.message));
    }
  }
}

module.exports = new AnimalController();
