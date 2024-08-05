import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Database query failed' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
