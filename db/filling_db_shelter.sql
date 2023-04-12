\c shelter_db
\copy donations("donationName", "donationSum","createdAt","updatedAt") from 'data/donations.csv' delimiter ';' csv;

\copy dict_privileges("privName","createdAt","updatedAt") from 'data/dict_privileges.csv' delimiter ';' csv;

\copy user_shelters("userFIO", "userLogin", "userCheck", "dictPrivilegePrivId","createdAt","updatedAt") from 'data/user_shelters.csv' delimiter ';' csv;

\copy messages("messageName", "phone", "email", "messageText", "preferredContactMethod", "answerFlag","createdAt","updatedAt") from 'data/messages.csv' delimiter ';' csv;

\copy vaccinations( "vaccinationName","createdAt","updatedAt") from 'data/vaccinations.csv' delimiter ';' csv;

\copy animals("animalType","animalName","animalSex","animalAge","animalHistory","animalBreed","animalImg","deleteFlag","createdAt","updatedAt") from 'data/animals.csv' delimiter ';' csv;

\copy info_shelters( "shelter_address", "shelter_phone", "shelter_email","createdAt","updatedAt") from 'data/info_shelters.csv' delimiter ';' csv;


\copy animal_x_vaccinations( "animalAnimalId", "vaccinationVaccinationId", "vaccinationDate","createdAt","updatedAt") from 'data/animal_x_vaccinations.csv' delimiter ';' csv;
