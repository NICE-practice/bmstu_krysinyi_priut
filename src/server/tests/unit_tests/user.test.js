const supertest = require("supertest");

process.env.PORT = 5005;

const { app, sequelize } = require("../../index");

const api = supertest(app);
const { initUsersWithTokens } = require("./tokens_for_tests");

const { priv1, userAdmin } = require("./data_for_tests");
const { DictPrivelege } = require("../../models/modelsORM");

describe("User API ", () => {
  beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  test("POST user (login): ok", async () => {
    await DictPrivelege.create(priv1);

    await api.post("/api/user/userAddingTMP").send({
      userFIO: userAdmin.userFIO,
      userLogin: userAdmin.userLogin,
      userCheck: userAdmin.userCheck,
      dictPrivilegePrivId: userAdmin.userPrivilege,
    });

    const { userLogin, userCheck } = userAdmin;

    const response = await api
      .post("/api/user/login")
      .send({ userLogin, userCheck })
      .expect(200);

    const { token } = response.body;
    expect(token).toBeDefined();
  });

  test("POST user (login): fail (does not exist)", async () => {
    const { userLogin, userCheck } = userAdmin;

    await api
      .post("/api/user/login")
      .send({ userLogin, userCheck })
      .expect(404);
  });

  test("POST user (login): fail (wrong password)", async () => {
    await DictPrivelege.create(priv1);

    await api.post("/api/user/userAddingTMP").send({
      userFIO: userAdmin.userFIO,
      userLogin: userAdmin.userLogin,
      userCheck: userAdmin.userCheck,
      dictPrivilegePrivId: userAdmin.userPrivilege,
    });

    const { userLogin } = userAdmin;

    await api
      .post("/api/user/login")
      .send({ userLogin, userCheck: "smth" })
      .expect(404);
  });

  test("GET user (regenerate token): ok", async () => {
    const { adminToken } = await initUsersWithTokens();
    const { userId, userLogin, userPrivilege } = userAdmin;

    const response = await api
      .get("/api/user/auth")
      .set({ authorization: adminToken })
      .query({ userId, userLogin, dictPrivilegePrivId: userPrivilege })
      .expect(200);

    const { token } = response.body;
    expect(token).toBeDefined();
  });

  test("GET user (regenerate token): fial (unauthorized)", async () => {
    const { userId, userLogin, userPrivilege } = userAdmin;

    await api
      .get("/api/user/auth")
      .query({ userId, userLogin, dictPrivilegePrivId: userPrivilege })
      .expect(401);
  });
});
