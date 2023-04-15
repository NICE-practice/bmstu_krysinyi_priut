const supertest = require("supertest");

process.env.PORT = 5001;

const { app, sequelize } = require("../../index");

const api = supertest(app);

const { initUsersWithTokens } = require("./tokens_for_tests");
const {
  vaccination1,
  vaccination2,
  vaccination3,
  animal1,
  animal2,
  animalVaccination1,
  animalVaccination2,
} = require("./data_for_tests");

const {
  Animal,
  Vaccination,
  AnimalVaccination,
} = require("../../models/modelsORM");

describe("Animal API ", () => {
  beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
    await Vaccination.create(vaccination1);
    await Vaccination.create(vaccination2);
    await Vaccination.create(vaccination3);
    await Animal.create(animal1);
    await Animal.create(animal2);
    await AnimalVaccination.create(animalVaccination1);
    await AnimalVaccination.create(animalVaccination2);
  });

  afterEach(async () => {});

  test("GET animal: all", async () => {
    const animals = await api
      .get("/api/animal")
      .query({ onlyNotDeleted: "false" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(animals.body).toHaveLength(2);
  });

  test("GET animal: onlyNotDeleted", async () => {
    const animals = await api
      .get("/api/animal")
      .query({ onlyNotDeleted: "true" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(animals.body).toHaveLength(1);
  });

  test("GET animal: by ID", async () => {
    const animal = await api
      .get(`/api/animal/${animal1.animalId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(animal.body.animalId).toEqual(animal1.animalId);
    expect(animal.body.animalVaccinationsList).toHaveLength(2);
  });

  test("POST animal: ok", async () => {
    const { vaccinationName } = vaccination1;
    const newAnimal = {
      animalType: "sobaka",
      animalName: "sutulaya",
      animalSex: "m",
      animalAge: 100,
      animalHistory: "sad",
      animalBreed: "pudel",
      animalImg: "smth.png",
      deleteFlag: false,
      vaccinationsList: [
        { vaccinationName },
        {
          vaccinationName,
          vaccinationDate: "2021-07-27T21:00:00.000Z",
        },
      ],
    };

    const { contentManagerToken } = await initUsersWithTokens();

    await api
      .post("/api/animal")
      .set({ authorization: contentManagerToken })
      .send(newAnimal)
      .expect(200);

    const animals = await Animal.findAll();
    expect(animals[animals.length - 1].animalName).toBe(newAnimal.animalName);
  });

  test("POST animal: fail (unauthorized)", async () => {
    const { vaccinationName } = vaccination1;
    const newAnimal = {
      animalType: "sobaka",
      animalName: "sutulaya",
      animalSex: "m",
      animalAge: 100,
      animalHistory: "sad",
      animalBreed: "pudel",
      animalImg: "smth.png",
      deleteFlag: false,
      vaccinationsList: [
        { vaccinationName },
        {
          vaccinationName,
          vaccinationDate: "2021-07-27T21:00:00.000Z",
        },
      ],
    };

    await api.post("/api/animal").send(newAnimal).expect(401);
  });

  test("DELETE animal: ok", async () => {
    const { contentManagerToken } = await initUsersWithTokens();

    await api
      .delete(`/api/animal/${animal1.animalId}`)
      .set({ authorization: contentManagerToken })
      .expect(200);

    const animal = await Animal.findByPk(animal1.animalId);
    expect(animal.deleteFlag).toBe(true);
  });

  test("DELETE animal: fail (no such animal)", async () => {
    const { contentManagerToken } = await initUsersWithTokens();

    await api
      .delete(`/api/animal/10`)
      .set({ authorization: contentManagerToken })
      .expect(404);
  });

  test("PUT animal: ok", async () => {
    const { contentManagerToken } = await initUsersWithTokens();

    const updatedAnimal = animal1;
    updatedAnimal.animalName = "new name";
    updatedAnimal.vaccinationsList = [];

    await api
      .put(`/api/animal/${animal1.animalId}`)
      .set({ authorization: contentManagerToken })
      .send(updatedAnimal)
      .expect(200);

    const currentAnimal = await Animal.findByPk(animal1.animalId);
    expect(currentAnimal.animalName).toEqual(updatedAnimal.animalName);
  });

  test("PUT animal: fail (no such vaccine)", async () => {
    const { contentManagerToken } = await initUsersWithTokens();

    const updatedAnimal = animal1;
    updatedAnimal.animalName = "new name";
    updatedAnimal.vaccinationsList = [
      { vaccinationName: vaccination1.vaccinationName },
      {
        vaccinationName: "smthhhhh",
        vaccinationDate: "2021-07-27T21:00:00.000Z",
      },
    ];

    await api
      .put(`/api/animal/${animal1.animalId}`)
      .set({ authorization: contentManagerToken })
      .send(updatedAnimal)
      .expect(404);

    const currentAnimal = await Animal.findByPk(animal1.animalId);
    expect(currentAnimal.animalName).toEqual(updatedAnimal.animalName);
  });
});
