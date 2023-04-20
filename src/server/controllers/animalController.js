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

  async getList(req, res) {
    let { limit, page } = req.query;
    const { onlyNotDeleted } = req.query;

    page = page || 1;
    limit = limit || 9;
    const offset = page * limit - limit;

    let animalsORM;
    let animalsCount;
    if (onlyNotDeleted === "true") {
      const { count, rows } = await Animal.findAndCountAll({
        where: { deleteFlag: false },
        limit,
        offset,
      });
      animalsORM = rows;
      animalsCount = count;
    } else {
      const { count, rows } = await Animal.findAndCountAll({ limit, offset });
      animalsORM = rows;
      animalsCount = count;
    }

    const animalsDTO = [];

    for (const animalORM of animalsORM) {
      const animalDTO = await AnimalController.build_animalDTO_by_animalORM(
        animalORM
      );
      animalsDTO.push(animalDTO);
    }
    return res.json({ animals: animalsDTO, animalsCount });
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

/**
 * @swagger
 * tags:
 *   name: Animals
 *   description: The animals managing API
 * /animal:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Add a new animal
 *     tags: [Animals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: The added animsl.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       404:
 *         description: Some of the listed vaccinations don't exist
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Header didn't contain authorization token
 *       403:
 *         description: Role of the user doesn't give access for this call
 * */

/**
 * @swagger
 * /animal:
 *   get:
 *     summary: Get animal list
 *     tags: [Animals]
 *     parameters:
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *         allowReserved: true
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         allowReserved: true
 *         description: The numbers of items to return
 *       - in: query
 *         name: onlyNotDeleted
 *         required: false
 *         schema:
 *           type: boolean
 *         allowReserved: true
 *         description: if 1 then only animals that are currently in a petshelter are shown, if 0 -- all
 *     responses:
 *       200:
 *         description: The list of animals
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                animalsCount:
 *                  type: integer
 *                  description: The total amount of animals in DB (the maximum number that can be returned)
 *                animal:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Animal'
 *                  description: Animals list
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /animal/{animalId}:
 *   get:
 *     summary: Get an animal by id
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: integer
 *         allowReserved: true
 *         description: The id of animal to find
 *     responses:
 *       200:
 *         description: Animal with the specified Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       404:
 *         description: Animal with specified id doesn't exist
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /animal/{animalId}:
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Mark that the animal is not in the petshelter animore (change deleteFlag)
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: integer
 *         allowReserved: true
 *         description: The id of animal to find
 *     responses:
 *       200:
 *         description: Animal with the specified Id and deleteFlag=true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       404:
 *         description: Animal with specified id doesn't exist
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Header didn't contain authorization token
 *       403:
 *         description: Role of the user doesn't give access for this call
 */

/**
 * @swagger
 * /animal/{animalId}:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Update animal by it's id
 *     tags: [Animals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                $ref: '#/components/schemas/Animal'
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: integer
 *         allowReserved: true
 *         description: The id of animal to update
 *     responses:
 *       200:
 *         description: Updated animal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       401:
 *         description: Header didn't contain authorization token
 *       403:
 *         description: Role of the user doesn't give access for this call
 *       404:
 *         description: Animal with specified id doesn't exist
 *       500:
 *         description: Internal server error
 */
