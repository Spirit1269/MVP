DROP TABLE IF EXISTS yarn_table CASCADE;
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
CREATE TABLE yarn_table (
    id SERIAL PRIMARY KEY,
    brand varchar(255) NOT NULL,
    name_ varchar(255),
    size_id INTEGER REFERENCES size (id),
    fiber_type1 TEXT NOT NULL,
    fiber_type2 TEXT,
    color varchar (100),
    length_ INTEGER,
    quantity INTEGER

);