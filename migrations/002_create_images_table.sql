CREATE TABLE IF NOT EXISTS images (
    image_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    mime_type VARCHAR(255) NOT NULL
);
