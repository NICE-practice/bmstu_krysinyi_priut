const priv1 = {
  privId: 1,
  privName: "admin",
};

const priv2 = {
  privId: 2,
  privName: "operator",
};

const priv3 = {
  privId: 3,
  privName: "content-manager",
};

const userAdmin = {
  userId: 1,
  userFIO: "adimn",
  userLogin: "admin",
  userCheck: "admin",
  userPrivilege: 1,
};

const userOperator = {
  userId: 2,
  userFIO: "operator",
  userLogin: "operator",
  userCheck: "operator",
  userPrivilege: 2,
};

const userContentManager = {
  userId: 3,
  userFIO: "contentManager",
  userLogin: "contentManager",
  userCheck: "contentManager",
  userPrivilege: 3,
};

const vaccination1 = { vaccinationId: 1, vaccinationName: "vaccination1" };
const vaccination2 = { vaccinationId: 2, vaccinationName: "vaccination2" };
const vaccination3 = { vaccinationId: 3, vaccinationName: "vaccination3" };

const animal1 = {
  animalId: 1,
  animalType: "animalType1",
  animalName: "animalName1",
  animalSex: "animalSex1",
  animalAge: 1,
  animalHistory: "history1",
  animalBreed: "animalBreed1",
  animalImg: "animalImg1.png",
  deleteFlag: false,
};
const animal2 = {
  animalId: 2,
  animalType: "animalType2",
  animalName: "animalName2",
  animalSex: "animalSex2",
  animalAge: 2,
  animalHistory: "history2",
  animalBreed: "animalBreed2",
  animalImg: "animalImg2.png",
  deleteFlag: true,
};

const animalVaccination1 = {
  animalVaccinationId: 1,
  vaccinationDate: null,
  animalAnimalId: animal1.animalId,
  vaccinationVaccinationId: vaccination1.vaccinationId,
};
const animalVaccination2 = {
  animalVaccinationId: 2,
  vaccinationDate: "2022-11-19T21:00:00.000Z",
  animalAnimalId: animal1.animalId,
  vaccinationVaccinationId: vaccination2.vaccinationId,
};

const infoShelter1 = {
  shelter_address: "shelter_address",
  shelter_phone: "shelter_phone",
  shelter_email: "shelter_email",
};

const donation1 = {
  donationId: 1,
  donationName: "smth",
  donationSum: 1,
};

const message1 = {
  messageId: 1,
  messageName: "messageName1",
  phone: "phone1",
  email: "email1",
  messageText: "messageText1",
  preferredContactMethod: "preferredContactMethod1",
  answerFlag: false,
};

const message2 = {
  messageId: 2,
  messageName: "messageName2",
  phone: "phone2",
  email: "email2",
  messageText: "messageText2",
  preferredContactMethod: "preferredContactMethod2",
  answerFlag: true,
};

module.exports = {
  priv1,
  priv2,
  priv3,
  userAdmin,
  userContentManager,
  userOperator,
  vaccination1,
  vaccination2,
  vaccination3,
  animal1,
  animal2,
  animalVaccination1,
  animalVaccination2,
  infoShelter1,
  donation1,
  message1,
  message2,
};
