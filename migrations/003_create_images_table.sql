CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES characters(id),
    content TEXT NOT NULL,
    mime_type VARCHAR(255) NOT NULL
);
