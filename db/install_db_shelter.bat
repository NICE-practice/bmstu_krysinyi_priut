psql -h 127.0.0.1 "sslmode=disable user=postgres port=5432 password=%1" < ./create_db_shelter.sql

pip install psycopg2
pip install faker
pip install animals.py

python generate_db_shelter.py %1