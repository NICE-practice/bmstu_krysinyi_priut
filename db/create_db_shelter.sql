DROP database IF EXISTS shelter_db;
CREATE database shelter_db;


\c shelter_db;

DROP TABLE IF EXISTS donations;
DROP TABLE IF EXISTS user_shelters;
DROP TABLE IF EXISTS dict_privileges;
DROP TABLE IF EXISTS animal_x_vaccinations;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS vaccinations;
DROP TABLE IF EXISTS animals;
DROP TABLE IF EXISTS info_shelters;

-- 1. Создание таблицы животных
CREATE TABLE IF NOT EXISTS "animals" (
    "animalId"  SERIAL , 
    "animalType" VARCHAR(1000) NOT NULL, 
    "animalName" VARCHAR(1000) NOT NULL, 
    "animalSex" VARCHAR(1000) NOT NULL, 
    "animalAge" INTEGER NOT NULL, 
    "animalHistory" VARCHAR(1000) NOT NULL, 
    "animalBreed" VARCHAR(1000) NOT NULL, 
    "animalImg" VARCHAR(1000) NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("animalId"));


-- 2. Создание таблицы вакцины
CREATE TABLE IF NOT EXISTS "vaccinations" (
    "vaccinationId"  SERIAL , 
    "vaccinationName" VARCHAR(1000) NOT NULL UNIQUE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("vaccinationId"));



-- 3. Создание таблицы сообщений
CREATE TABLE IF NOT EXISTS "messages" (
    "messageId"  SERIAL , 
    "messageName" VARCHAR(1000) NOT NULL, 
    "phone" VARCHAR(1000) NOT NULL, 
    "email" VARCHAR(1000) NOT NULL, 
    "messageText" TEXT NOT NULL, 
    "preferredContactMethod" VARCHAR(1000) NOT NULL, 
    "answerFlag" BOOLEAN DEFAULT false, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("messageId"));



-- 4. Связующая таблица (животное и вакцинация) 
CREATE TABLE IF NOT EXISTS "animal_x_vaccinations" (
    "animalVaccinationId"  SERIAL , 
    "vaccinationDate" TIMESTAMP WITH TIME ZONE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "vaccinationVaccinationId" INTEGER REFERENCES 
    "vaccinations" ("vaccinationId") ON DELETE CASCADE ON UPDATE CASCADE, 
    "animalAnimalId" INTEGER REFERENCES "animals" ("animalId") ON DELETE CASCADE ON UPDATE CASCADE, 
    --UNIQUE ("vaccinationVaccinationId", "animalAnimalId"), 
    PRIMARY KEY ("animalVaccinationId"));


-- 5. Создание таблицы про приют
CREATE TABLE IF NOT EXISTS "info_shelters" (
    "id"   SERIAL , 
    "shelter_address" TEXT, 
    "shelter_phone" TEXT, 
    "shelter_email" TEXT, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id"));


-- 6. Создание таблицы привелегий
CREATE TABLE IF NOT EXISTS "dict_privileges" (
    "privId"  SERIAL , 
    "privName" VARCHAR(1000) NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
     PRIMARY KEY ("privId"));



-- 7. Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS "user_shelters" (
    "userId"  SERIAL , 
    "userFIO" VARCHAR(1000) NOT NULL, 
    "userLogin" VARCHAR(1000) NOT NULL, 
    "userCheck" TEXT NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "dictPrivilegePrivId" INTEGER REFERENCES "dict_privileges" ("privId") ON DELETE SET NULL ON UPDATE CASCADE, 
    PRIMARY KEY ("userId"));



-- 8. Таблица донатов
CREATE TABLE IF NOT EXISTS "donations" (
    "donationId"  SERIAL , 
    "donationName" VARCHAR(1000), 
    "donationSum" INTEGER, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("donationId"));

