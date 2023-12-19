-- Characters and quotes junction table
CREATE TABLE IF NOT EXISTS character_quotes (
    character_id INT REFERENCES characters(id),
    quote_id INT REFERENCES quotes(id),
    PRIMARY KEY (character_id, quote_id)
);
