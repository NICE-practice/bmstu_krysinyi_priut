const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Animal = sequelize.define("animal", {
  animalId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  animalType: { type: DataTypes.STRING, allowNull: false },
  animalName: { type: DataTypes.STRING, allowNull: false },
  animalSex: { type: DataTypes.STRING, allowNull: false },
  animalAge: { type: DataTypes.INTEGER, allowNull: false },
  animalHistory: { type: DataTypes.STRING, allowNull: false },
  animalBreed: { type: DataTypes.STRING, allowNull: false },
  animalImg: { type: DataTypes.STRING, allowNull: false },
  deleteFlag: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }, // существует
});

const Vaccination = sequelize.define("vaccination", {
  vaccinationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vaccinationName: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const AnimalVaccination = sequelize.define("animal_x_vaccination", {
  animalVaccinationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }, // an_x_vac_id
  vaccinationDate: { type: DataTypes.DATE },
});

Vaccination.belongsToMany(Animal, { through: AnimalVaccination }); // vaccination_id
Animal.belongsToMany(Vaccination, { through: AnimalVaccination }); // animal_id

const Message = sequelize.define("message", {
  messageId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  messageName: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  messageText: { type: DataTypes.TEXT, allowNull: false },
  preferredContactMethod: { type: DataTypes.STRING, allowNull: false },
  answerFlag: { type: DataTypes.BOOLEAN, defaultValue: false }, // ждет ответа
});

const InfoShelter = sequelize.define("info_shelter", {
  shelter_address: { type: DataTypes.TEXT },
  shelter_phone: { type: DataTypes.TEXT },
  shelter_email: { type: DataTypes.TEXT },
});

const DictPrivelege = sequelize.define("dict_privilege", {
  privId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  privName: { type: DataTypes.STRING, allowNull: false },
});

const UserShelter = sequelize.define("user_shelter", {
  userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userFIO: { type: DataTypes.STRING, allowNull: false },
  userLogin: { type: DataTypes.STRING, allowNull: false },
  userCheck: { type: DataTypes.TEXT, allowNull: false },
});

DictPrivelege.hasMany(UserShelter, { as: "userPrivilege" });
UserShelter.belongsTo(DictPrivelege);

const Donation = sequelize.define("donation", {
  donationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  donationName: { type: DataTypes.STRING },
  donationSum: { type: DataTypes.INTEGER },
});

module.exports = {
  Animal,
  Vaccination,
  AnimalVaccination,
  Message,
  InfoShelter,
  DictPrivelege,
  UserShelter,
  Donation,
};
