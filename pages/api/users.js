// pages/api/carts.js
import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM carts');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
}
