\c postgres

DROP DATABASE IF EXISTS knex_shopping;
DROP USER IF EXISTS knex_user;

CREATE USER knex_user WITH PASSWORD 'password';
CREATE DATABASE knex_shopping WITH OWNER knex_user;

\c knex_shopping knex_user

CREATE TABLE users(
  id serial NOT NULL PRIMARY KEY,
  email VARCHAR(255), NOT NULL,
  password VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);