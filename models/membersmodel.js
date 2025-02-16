const db  = require('../db');


const Member = {
  // Fetch all members
  getAll: async () => {
    return db.any('SELECT * FROM members');
  },

  // Get a member by ID
  getById: async (id) => {
    return db.oneOrNone('SELECT * FROM members WHERE id = $1', [id]);
  },

  // Create a new member
  create: async (name, email, photo, safari_group_id, gender, role, location, nk, nk_contact) => {
    return db.none(
      `INSERT INTO members(name, email, photo, safari_group_id, gender, role, location, nk, nk_contact)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [name, email, photo, safari_group_id, gender, role, location, nk, nk_contact]
    );
  },

  // Update an existing member
  update: async (id, name, email, photo, safari_group_id, gender, role, location, nk, nk_contact) => {
    return db.none(
      `UPDATE members
       SET name = $1,
           email = $2,
           photo = $3,
           safari_group_id = $4,
           gender = $5,
           role = $6,
           location = $7,
           nk = $8,
           nk_contact = $9
       WHERE id = $10`,
      [name, email, photo, safari_group_id, gender, role, location, nk, nk_contact, id]
    );
  },

  // Delete a member by ID
  delete: async (id) => {
    return db.none('DELETE FROM members WHERE id = $1', [id]);
  }
};

module.exports = Member;
