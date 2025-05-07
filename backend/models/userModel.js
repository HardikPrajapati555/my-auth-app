const pool = require('../config/db');

const createUser = async ({ firstName, lastName, email, passwordHash, role, verificationToken }) => {
  const res = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password, role, is_verified, verification_token)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [firstName, lastName, email, passwordHash, role, false, verificationToken]
  );
  return res.rows[0];
};

const findUserByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

const verifyUserEmail = async (token) => {
  const res = await pool.query(
    `UPDATE users SET is_verified = true, verification_token = NULL WHERE verification_token = $1 RETURNING *`,
    [token]
  );
  return res.rows[0];
};

module.exports = { createUser, findUserByEmail, verifyUserEmail };
