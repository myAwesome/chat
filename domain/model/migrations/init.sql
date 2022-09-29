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
    room integer REFERENCES room(id) ON DELETE CASCADE ON UPDATE CASCADE,
    author integer REFERENCES participant(id) ON DELETE CASCADE ON UPDATE CASCADE,
    text text,
    created_at date
);

CREATE TABLE room_has_participant (
    room integer REFERENCES room(id) ON DELETE CASCADE ON UPDATE CASCADE,
    participant integer REFERENCES participant(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at date
);