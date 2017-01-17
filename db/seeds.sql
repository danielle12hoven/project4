DROP TABLE if EXISTS users;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password_digest VARCHAR(255)
);


CREATE TABLE emails(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL
);


INSERT INTO users (email, password_digest) VALUES ('danielle12hoven@gmail.com', '1111');
INSERT INTO emails (name, email, message) VALUES ('Danielle', 'danielle12hoven@yahoo.com', 'hello');

