#!/bin/bash

psql -h 127.0.0.1 "sslmode=disable user=postgres port=5432 password=ira5555" < ./create_db_shelter.sql


python3 generate_db_shelter.py
