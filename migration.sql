DROP TABLE IF EXISTS yarn CASCADE;
DROP TABLE IF EXISTS size CASCADE;
DROP TABLE IF EXISTS fiber_type CASCADE;



CREATE TABLE size (
    id SERIAL PRIMARY KEY,
    size_name TEXT
);

CREATE TABLE fiber_type (
    id SERIAL PRIMARY KEY,
    fiber_name TEXT
);
CREATE TABLE yarn (
    id SERIAL,
    name_ varchar(255),
    brand varchar(255),
    size_id INTEGER REFERENCES size (id),
    fiber_type1 INTEGER REFERENCES fiber_type (id),
    fiber_type2 INTEGER REFERENCES fiber_type (id),
    color varchar (100),
    length_ INTEGER,
    quantity INTEGER,
    PRIMARY KEY (id)

);