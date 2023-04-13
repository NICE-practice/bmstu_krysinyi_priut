const supertest = require("supertest");
process.env.PORT = 5005;
const { app, sequelize } = require("../../index.js");
const api = supertest(app);
const { initUsersWithTokens } = require("./tokens_for_tests.js");

const {
  userAdmin,
  userOperator,
  userContentManager,
  priv1,
  priv2,
  priv3,
} = require("./data_for_tests.js");
const { UserShelter, DictPrivelege } = require("../../models/modelsORM.js");

describe("User API ", () => {
  beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  test("POST user (login): ok", async () => {
    await DictPrivelege.create(priv1);

    let adminToken = await api.post("/api/user/userAddingTMP").send({
      userFIO: userAdmin.userFIO,
      userLogin: userAdmin.userLogin,
      userCheck: userAdmin.userCheck,
      dictPrivilegePrivId: userAdmin.userPrivilege,
    });

    let { userLogin, userCheck } = userAdmin;

    const response = await api
      .post("/api/user/login")
      .send({ userLogin, userCheck })
      .expect(200);

    const token = response.body.token;
    expect(token).toBeDefined();
  });

  test("POST user (login): fail (does not exist)", async () => {
    let { userLogin, userCheck } = userAdmin;

    const response = await api
      .post("/api/user/login")
      .send({ userLogin, userCheck })
      .expect(404);
  });

  test("POST user (login): fail (wrong password)", async () => {
    await DictPrivelege.create(priv1);

    let adminToken = await api.post("/api/user/userAddingTMP").send({
      userFIO: userAdmin.userFIO,
      userLogin: userAdmin.userLogin,
      userCheck: userAdmin.userCheck,
      dictPrivilegePrivId: userAdmin.userPrivilege,
    });

    let { userLogin, userCheck } = userAdmin;

    const response = await api
      .post("/api/user/login")
      .send({ userLogin, userCheck: "smth" })
      .expect(404);
  });

  test("GET user (regenerate token): ok", async () => {
    let { adminToken } = await initUsersWithTokens();
    let { userId, userLogin, userPrivilege } = userAdmin;

    const response = await api
      .get("/api/user/auth")
      .set({ authorization: adminToken })
      .query({ userId, userLogin, dictPrivilegePrivId: userPrivilege })
      .expect(200);

    const token = response.body.token;
    expect(token).toBeDefined();
  });

  test("GET user (regenerate token): fial (unauthorized)", async () => {
    let { userId, userLogin, userPrivilege } = userAdmin;

    const response = await api
      .get("/api/user/auth")
      .query({ userId, userLogin, dictPrivilegePrivId: userPrivilege })
      .expect(401);
  });
});
