import pool from "../../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ error: 'Name, phone, and email are required' });
    }

    try {
      const result = await pool.query(
        'UPDATE users SET name = $1, phone = $2, email = $3 WHERE id = $4 RETURNING *',
        [name, phone, email, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating database:', error);
      res.status(500).json({ error: 'Database update failed' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
