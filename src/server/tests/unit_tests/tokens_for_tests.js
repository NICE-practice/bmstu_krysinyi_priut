const { DictPrivelege, UserShelter } = require("../../models/modelsORM");
const supertest = require("supertest");
const { app, sequelize } = require("../../index.js");
const api = supertest(app);
const {
  priv1,
  priv2,
  priv3,
  userAdmin,
  userOperator,
  userContentManager,
} = require("./data_for_tests");

const initUsersWithTokens = async () => {
  await DictPrivelege.create(priv1);
  await DictPrivelege.create(priv2);
  await DictPrivelege.create(priv3);

  let adminToken = await api.post("/api/user/userAddingTMP").send({
    userFIO: userAdmin.userFIO,
    userLogin: userAdmin.userLogin,
    userCheck: userAdmin.userCheck,
    dictPrivilegePrivId: userAdmin.userPrivilege,
  });
  adminToken = `Bearer ${adminToken.body.token}`;

  let contentManagerToken = await api.post("/api/user/userAddingTMP").send({
    userFIO: userContentManager.userFIO,
    userLogin: userContentManager.userLogin,
    userCheck: userContentManager.userCheck,
    dictPrivilegePrivId: userContentManager.userPrivilege,
  });
  contentManagerToken = `Bearer ${contentManagerToken.body.token}`;

  let operatorToken = await api.post("/api/user/userAddingTMP").send({
    userFIO: userOperator.userFIO,
    userLogin: userOperator.userLogin,
    userCheck: userOperator.userCheck,
    dictPrivilegePrivId: userOperator.userPrivilege,
  });
  operatorToken = `Bearer ${operatorToken.body.token}`;

  return { contentManagerToken, adminToken, operatorToken };
};

module.exports = { initUsersWithTokens };
