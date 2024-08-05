import pool from "../../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(204).end();
    } catch (error) {
      console.error('Error deleting from database:', error);
      res.status(500).json({ error: 'Database delete failed' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
