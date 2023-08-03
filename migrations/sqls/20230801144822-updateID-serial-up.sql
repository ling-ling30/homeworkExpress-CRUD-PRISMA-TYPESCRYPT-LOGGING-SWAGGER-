CREATE SEQUENCE users_id_seq
START 101;

UPDATE users
SET id = nextval('users_id_seq');

ALTER TABLE users
ALTER COLUMN id
SET
DEFAULT nextval
('users_id_seq');

ALTER TABLE users
ADD PRIMARY KEY (id);


CREATE SEQUENCE movies_id_seq
START 101;

UPDATE movies
SET id = nextval('users_id_seq');

ALTER TABLE movies
ALTER COLUMN id
SET
DEFAULT nextval
('movies_id_seq');

ALTER TABLE movies
ADD PRIMARY KEY (id);