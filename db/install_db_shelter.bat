psql -h 127.0.0.1 "sslmode=disable user=postgres port=5432 password=%1" < ./create_db_shelter.sql

psql -h 127.0.0.1 "sslmode=disable user=postgres port=5432 password=%1" < ./filling_db_shelter.sql 
