import psycopg2
from psycopg2 import Error
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from faker import Faker
from faker_vehicle import VehicleProvider
from random import randint, choice, sample
import string
from animals import Animals
import datetime

animal_name_m = []
with open('name_m.txt', encoding="utf-8") as f:
    animal_name_m = f.read()
animal_name_m = animal_name_m.split('\n')
animal_name_m = animal_name_m[:-1]


animal_name_w = []
with open('name_w.txt', encoding="utf-8") as f:
    animal_name_w = f.read()
animal_name_w = animal_name_w.split('\n')
animal_name_w = animal_name_w[:-1]


breed_dog = []
with open('breed_dog.txt', encoding="utf-8") as f:
    breed_dog = f.read()
breed_dog = breed_dog.split('\n')
breed_dog = breed_dog[:-1]


breed_cat = []
with open('breed_cat.txt', encoding="utf-8") as f:
    breed_cat = f.read()
breed_cat = breed_cat.split('\n')
breed_cat = breed_cat[:-1]


vaccination = []
with open('vaccination.txt', encoding="utf-8") as f:
    vaccination = f.read()
vaccination = vaccination.split('\n')
vaccination = vaccination[:-1]


history = []
with open('history_animal.txt', encoding="utf-8") as f:
    history = f.read()
history = history.split('\n')
history = history[:-1]


text_message = []
with open('text_message.txt', encoding="utf-8") as f:
    text_message = f.read()
text_message = text_message.split('\n')
text_message = text_message[:-1]



PRIVILEGE = ['admin', 'operator', 'content-menegere']

BREED_DOG = len(breed_dog)
BREED_CAT = len(breed_cat)
ANIMALS = len(animal_name_m) + len(animal_name_w)
VACCINATIONS = len(vaccination)
ANIMAL_X_VACCINETION = 200
MESSAGE = 1000
USER = 100
DONATION = 50

DOG_VAC = 12
CAT_VAC = 8

def generate_animals(connection, cursor):
    fake = Faker()#['ru_RU'])
    f = Faker()
    id = 0
    for i in range(200): #len(animal_name_m) 
        print(i)
        id += 1
        name = animal_name_m[i]
        sex = "м"
        age = randint(1, 20)
        j = randint(0, 4)
        history_a = history[j]
        if (id % 2 == 0):
            breed = breed_dog[randint(0, BREED_DOG - 1)]
            animal = Animals('dog')
            type = 'dog'
            img = animal.image()
        else:
            breed = breed_cat[randint(0, BREED_CAT - 1)]
            animal = Animals('cat')
            type = 'cat'
            img = animal.image()
        flag = 0
        s_date = str(datetime.datetime.now())
        sql_insert = f"""INSERT INTO \"animals\" (\"animalId\",\"animalType\",\"animalName\",\"animalSex\",\"animalAge\",\"animalHistory\",\"animalBreed\",\"animalImg\",\"deleteFlag\",\"createdAt\",\"updatedAt\")
                         VALUES (DEFAULT, \'{type}\', \'{name}\', \'{sex}\', {age}, \'{history_a}\', \'{breed}\', \'{img}\',  \'{flag}\', \'{s_date}\', \'{s_date}\');"""
        cursor.execute(sql_insert)
        connection.commit()


    for i in range(200): #len(animal_name_w)
        print(i)
        id += 1
        name = animal_name_w[i]
        sex = "ж"
        age = randint(1, 20)
        j = randint(0, 4)
        history_a = history[j]
        if (id % 2 == 0):
            breed = breed_dog[randint(0, BREED_DOG - 1)]
            animal = Animals('dog')
            type = 'dog'
            img = animal.image()
        else:
            breed = breed_cat[randint(0, BREED_CAT - 1)]
            animal = Animals('cat')
            type = 'cat'
            img = animal.image()
        flag = 0
        s_date = str(datetime.datetime.now())
        sql_insert = f"""INSERT INTO \"animals\" (\"animalId\",\"animalType\",\"animalName\",\"animalSex\",\"animalAge\",\"animalHistory\",\"animalBreed\",\"animalImg\",\"deleteFlag\",\"createdAt\",\"updatedAt\")
                         VALUES (DEFAULT, \'{type}\', \'{name}\', \'{sex}\', {age}, \'{history_a}\', \'{breed}\', \'{img}\',  \'{flag}\', \'{s_date}\', \'{s_date}\');"""
        cursor.execute(sql_insert)
        connection.commit()


def generate_vaccination(connection, cursor):
    for i in range(VACCINATIONS):
        name = vaccination[i]
        s_date = str(datetime.datetime.now())
        sql_insert = f"""INSERT INTO \"vaccinations\" (\"vaccinationId\", \"vaccinationName\",\"createdAt\",\"updatedAt\")
                         VALUES (DEFAULT, \'{name}\', \'{s_date}\', \'{s_date}\');"""
        cursor.execute(sql_insert)
        connection.commit()


def generate_animal_x_vaccination(connection, cursor):
    fake = Faker(['ru_RU'])
    for i in range(ANIMAL_X_VACCINETION):
        animal_id = randint(1, 400) #ANIMALS
        if (animal_id % 2 == 0):
            vac_id = randint(1, DOG_VAC)
        else:
            vac_id = randint(CAT_VAC, VACCINATIONS)
        date = str(fake.date_this_decade())
        s_date = str(datetime.datetime.now())
        sql_insert = f"""INSERT INTO \"animal_x_vaccinations\" (\"animalVaccinationId\", \"animalAnimalId\", \"vaccinationVaccinationId\", \"vaccinationDate\",\"createdAt\",\"updatedAt\")
                         VALUES (DEFAULT, {animal_id}, {vac_id}, \'{date}\', \'{s_date}\', \'{s_date}\');"""
        cursor.execute(sql_insert)
        connection.commit()


def generate_message(connection, cursor):
    fake = Faker(['ru_RU'])
    for i in range(MESSAGE):
        name = fake.name()
        phone = '+7'
        for j in range(10):
            phone += str(randint(0, 9))
        email = fake.email()
        j = randint(0, 7)
        text = text_message[j]
        pre = choice(['телефон', 'email'])
        flag = 0
        s_date = str(datetime.datetime.now())
        sql_insert = f"""INSERT INTO \"messages\" (\"messageId\", \"messageName\", \"phone\", \"email\", \"messageText\", \"preferredContactMethod\", \"answerFlag\",\"createdAt\",\"updatedAt\")
                         VALUES (DEFAULT, \'{name}\', \'{phone}\', \'{email}\', \'{text}\', \'{pre}\', \'{flag}\', \'{s_date}\', \'{s_date}\');"""
        cursor.execute(sql_insert)
        connection.commit()


def generate_info_shelter(connection, cursor):
    fake = Faker(['ru_RU'])
    address = "Любовь, улица Надежды, доп Доброты"
    phone = "+7-895-923-25-54"
    email = "iva@iva.shelter.com"
    s_date = str(datetime.datetime.now())
    sql_insert = f"""INSERT INTO \"info_shelters\" (\"id\", \"shelter_address\", \"shelter_phone\", \"shelter_email\",\"createdAt\",\"updatedAt\")
                        VALUES (DEFAULT, \'{address}\', \'{phone}\', \'{email}\', \'{s_date}\', \'{s_date}\');"""
    cursor.execute(sql_insert)
    connection.commit()


def generate_dict_privilege(connection, cursor):
    fake = Faker(['ru_RU'])
    for i in range(len(PRIVILEGE)):
        s_date = str(datetime.datetime.now())
        sql_insert = f"""INSERT INTO \"dict_privileges\" (\"privId\", \"privName\",\"createdAt\",\"updatedAt\")
                         VALUES (\'{i + 1}\', \'{PRIVILEGE[i]}\', \'{s_date}\', \'{s_date}\');"""
        cursor.execute(sql_insert)
        connection.commit()


def generate_user_shelter(connection, cursor):
    chars=string.ascii_uppercase + string.digits
    fake = Faker(['ru_RU'])
    for i in range(USER):
        name = fake.name()
        login = fake.email()
        login = login.partition('@')[0] + "@iva.shelter.com"
        check = ''.join(choice(chars) for _ in range(10))
        priv = choice([i + 1 for i in range(len(PRIVILEGE))])
        s_date = str(datetime.datetime.now())
        sql_insert = f"""INSERT INTO \"user_shelters\" (\"userId\", \"userFIO\", \"userLogin\", \"userCheck\", \"dictPrivilegePrivId\",\"createdAt\",\"updatedAt\")
                         VALUES (DEFAULT, \'{name}\', \'{login}\', \'{check}\', {priv}, \'{s_date}\', \'{s_date}\');"""
        cursor.execute(sql_insert)
        connection.commit()


def generate_donation(connection, cursor):
    fake = Faker(['ru_RU'])
    for i in range(DONATION):
        if (i % 10) == 0:
            name = fake.name()
        else:
            name = "аноним"
        sum = randint(500, 5000)
        s_date = str(datetime.datetime.now())
        sql_insert = f"""INSERT INTO \"donations\" (\"donationId\", \"donationName\", \"donationSum\",\"createdAt\",\"updatedAt\")
                         VALUES (DEFAULT, \'{name}\', {sum}, \'{s_date}\', \'{s_date}\');"""
        cursor.execute(sql_insert)
        connection.commit()



def main_fun():
    try:
    # Подключение к существующей базе данных
        connection = psycopg2.connect(database="shelter_db",
                                        user="postgres",
                                        # пароль, который указали при установке PostgreSQL
                                        password="1234",
                                        host="127.0.0.1",
                                        port="5432")
        connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        # Курсор для выполнения операций с базой данных
        cursor = connection.cursor()

        generate_animals(connection, cursor)
        print('1')
        generate_vaccination(connection, cursor)
        print('2')
        generate_animal_x_vaccination(connection, cursor)
        print('3')
        generate_message(connection, cursor)
        print('4')
        generate_info_shelter(connection, cursor)
        print('5')
        generate_dict_privilege(connection, cursor)
        print('6')
        generate_user_shelter(connection, cursor)
        print('7')
        generate_donation(connection, cursor)
        print('8')


    except (Exception, Error) as error:
        print("Ошибка при работе с PostgreSQL", error)



main_fun()


