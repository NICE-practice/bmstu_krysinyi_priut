const supertest = require("supertest");

process.env.PORT = 5003;

const { app, sequelize } = require("../../index");

const api = supertest(app);

const { donation1 } = require("./data_for_tests");

const { Donation } = require("../../models/modelsORM");

describe("Donation API ", () => {
  beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
    await Donation.create(donation1);
  });

  test("POST donation: ok", async () => {
    const newDonation = {
      donationName: "me",
      donationSum: 20,
    };

    await api.post("/api/donation").send(newDonation).expect(200);

    const donations = await Donation.findAll();
    expect(donations[donations.length - 1].donationName).toBe(
      newDonation.donationName
    );
  });

  test("POST donation: fail (repeated id)", async () => {
    const newDonation = {
      donationId: 1,
      donationName: "some",
      donationSum: 10,
    };

    await api.post("/api/donation").send(newDonation).expect(500);
  });
});
