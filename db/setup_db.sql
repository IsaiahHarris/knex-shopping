\c postgres

DROP USER IF EXISTS knex_user;
DROP DATABASE IF EXISTS knex_shopping;


CREATE USER knex_user WITH PASSWORD 'password';
CREATE DATABASE knex_shopping WITH OWNER knex_user;

\c knex_shopping knex_user

CREATE TABLE users(
  id serial NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id serial NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  inventory INTEGER,
  price DECIMAL(8,2),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE cart (
  id serial NOT NULL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  products_id INTEGER REFERENCES products(id),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);