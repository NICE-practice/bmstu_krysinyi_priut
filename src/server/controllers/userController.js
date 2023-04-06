const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../errors/ApiError");
const { UserShelter, DictPrivelege } = require("../models/modelsORM");

const generateJwt = (userId, userLogin, dictPrivilegePrivId) =>
  jwt.sign({ userId, userLogin, dictPrivilegePrivId }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

class UserController {
  // tmp
  async addUser(req, res, next) {
    const { userFIO, userLogin, userCheck, dictPrivilegePrivId } = req.body;

    if (!userLogin || !userCheck) {
      return next(ApiError.badRequest("Incorrect userLogin or userCheck"));
    }
    const candidate = await UserShelter.findOne({ where: { userLogin } });
    if (candidate) {
      return next(
        ApiError.badRequest("User with such userLogin already exists")
      );
    }

    const privilege = await DictPrivelege.findByPk(dictPrivilegePrivId);
    if (!privilege) {
      return next(ApiError.badRequest("Such privilege does not exist"));
    }

    const hashPassword = await bcrypt.hash(userCheck, 5);
    const user = await UserShelter.create({
      userFIO,
      userLogin,
      userCheck: hashPassword,
      dictPrivilegePrivId,
    });

    const token = generateJwt(
      user.userId,
      user.userLogin,
      user.dictPrivilegePrivId
    );
    return res.json({ token });
  }

  async login(req, res, next) {
    const { userLogin, userCheck } = req.body;
    const user = await UserShelter.findOne({ where: { userLogin } });
    if (!user) {
      return next(ApiError.internal("User with such userLogin does not exist"));
    }
    const comparePassword = bcrypt.compareSync(userCheck, user.userCheck);
    if (!comparePassword) {
      return next(ApiError.internal("Incorrect userCheck"));
    }
    const token = generateJwt(
      user.userId,
      user.userLogin,
      user.dictPrivilegePrivId
    );
    return res.json({ token });
  }

  // пересоздание токена
  async check(req, res) {
    const token = generateJwt(
      req.user.userId,
      req.user.userLogin,
      req.user.dictPrivilegePrivId
    );
    return res.json({ token });
  }
}

module.exports = new UserController();
