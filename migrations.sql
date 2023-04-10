DROP TABLE IF EXISTS yarn;
DROP TABLE IF EXISTS sizes;
DROP TABLE IF EXISTS fiber_type;

CREATE TABLE yarn (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    brand varchar(255) NOT NULL,
    size_id INTEGER REFERENCES sizes(id),
    fiber_type1 INTEGER REFERENCES fiber_type(id),
    fiber_type2 INTEGER REFERENCES fiber_type(id),
    color varchar(100),
    length INTEGER,
    quanity INTEGER
);

CREATE TABLE sizes (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE fiber_type (
    id SERIAL PRIMARY KEY,
    name TEXT
);