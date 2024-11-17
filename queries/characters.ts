// Get all characters
// export const GET_ALL = `
//   SELECT
//     c.id as id,
//     name,
//     content,
//     mime_type
//   FROM
//     images
//   INNER JOIN characters c ON images.character_id = c.id;
// `;

export const GET_ALL = `SELECT * FROM characters;`;

// Get character by id
export const GET_BY_ID = 'SELECT * FROM characters WHERE id = $1';
