DROP database IF EXISTS shelter_db;
CREATE database shelter_db;


\c shelter_db;

-- 1. Создание таблицы животных
DROP TABLE IF EXISTS animal;

CREATE TABLE IF NOT EXISTS animal(
	animal_id 		SERIAL NOT NULL PRIMARY KEY,
	animal_type		VARCHAR(5) not null,
	animal_name    	VARCHAR(1000)	NOT NULL,
	animal_sex    	VARCHAR(1)	NOT NULL,
    animal_age     	INTEGER	NOT NULL,
	animal_history	VARCHAR(10000) NOT NULL,
	animal_breed    VARCHAR(1000)	NOT NULL,
    animal_img		VARCHAR(1000)	NOT NULL,
    delete_flag		BOOLEAN -- 1-удалили, 0-существует
);

-- 2. Создание таблицы вакцины
DROP TABLE IF EXISTS vaccination;
CREATE TABLE IF NOT EXISTS vaccination(
	vaccinatiоn_id 	 	SERIAL NOT NULL PRIMARY KEY,
	vaccinatiоn_name	VARCHAR NOT NULL UNIQUE
);


-- 3. Создание таблицы сообщений
DROP TABLE IF EXISTS message;
CREATE TABLE IF NOT EXISTS message(
    message_id 	 	SERIAL NOT NULL PRIMARY KEY,
	message_name    VARCHAR(1000)            NOT NULL,
	phone    		VARCHAR(1000)	NOT NULL,
	email    		VARCHAR(1000)	NOT NULL,
	message_text 	TEXT NOT NULL,
	preferred_contact_method VARCHAR(10) not null, -- телефон/почта
	answer_flag		BOOLEAN -- 1-ответили, 0-ждет ответа
);


-- 4. Связующая таблица (животное и вакцинация) 
DROP TABLE IF EXISTS animal_x_vaccination;
CREATE TABLE IF NOT EXISTS animal_x_vaccination(
	an_x_vac_id SERIAL 	NOT NULL PRIMARY KEY,
	animal_id INTEGER NOT NULL REFERENCES animal(animal_id),
	vaccination_id	INTEGER NOT NULL REFERENCES vaccination(vaccinatiоn_id),
	vaccination_date DATE
);


-- 5. Создание таблицы про приют
DROP TABLE IF EXISTS info_shelter;
CREATE TABLE IF NOT EXISTS info_shelter(
	shelter_address TEXT,
	shelter_phone TEXT,
	shelter_email TEXT	
);



-- 6. Создание таблицы привелегий
DROP TABLE IF EXISTS dict_privilege;
CREATE TABLE IF NOT EXISTS dict_privilege(
	priv_id SERIAL NOT NULL PRIMARY KEY,
	priv_name VARCHAR(1000) NOT NULL
);




-- 7. Создание таблицы пользователей
DROP TABLE IF EXISTS user_shelter;
CREATE TABLE IF NOT EXISTS user_shelter(
	user_id SERIAL NOT NULL PRIMARY KEY,
	user_fio VARCHAR(1000) NOT NULL,
	user_login VARCHAR(1000) NOT NULL,
	user_check TEXT NOT NULL,
	user_privilege INTEGER NOT NULL REFERENCES dict_privilege(priv_id)
);



-- 8. Таблица донатов
DROP TABLE IF EXISTS donation;
CREATE TABLE IF NOT EXISTS donation(
	donation_id SERIAL NOT NULL PRIMARY KEY,
	donation_name VARCHAR(100),
	donation_sum INTEGER
);
