// Get all characters
export const GET_ALL = `
  SELECT
    c.id as id,
    name,
    content,
    mime_type
  FROM
    images
  INNER JOIN characters c ON images.character_id = c.id;
`;
