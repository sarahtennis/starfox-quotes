CREATE TABLE IF NOT EXISTS characters (
    character_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_id INT REFERENCES images(image_id),
    quote_id INT REFERENCES quotes(quote_id)
);
