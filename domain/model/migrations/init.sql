CREATE TABLE room (
    id SERIAL PRIMARY KEY,
    name text,
    is_direct boolean
);

CREATE TABLE participant (
    id SERIAL PRIMARY KEY,
    name text,
    email text UNIQUE,
    password text,
    token text
);

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    room integer REFERENCES room(id),
    author integer REFERENCES participant(id),
    time date
);