import pool from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, phone, email ,batch} = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO users (name, phone, email, batch) VALUES ($1, $2, $3,$4) RETURNING *',
        [name, phone, email,batch]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting into database:', error);
      res.status(500).json({ error: 'Database insert failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
