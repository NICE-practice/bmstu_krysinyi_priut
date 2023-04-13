const supertest = require("supertest");
process.env.PORT = 5002;
const { app, sequelize } = require("../../index.js");
const api = supertest(app);

const { infoShelter1 } = require("./data_for_tests.js");
const { InfoShelter } = require("../../models/modelsORM.js");

describe("InfoShelter API ", () => {
  beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
    await InfoShelter.create(infoShelter1);
  });

  test("GET: one and only", async () => {
    let infoShelter = await api
      .get("/api/infoShelter")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    infoShelter = infoShelter.body;
    expect(infoShelter.shelter_address).toEqual(infoShelter1.shelter_address);
    expect(infoShelter.shelter_phone).toEqual(infoShelter1.shelter_phone);
    expect(infoShelter.shelter_email).toEqual(infoShelter1.shelter_email);
  });
});
