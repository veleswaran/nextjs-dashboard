// pages/api/data.js
import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
    }
  } else if (req.method === 'POST') {
    const { name, phone,email } = req.body;
    console.log(name,phone,email)
   

    try {
      await pool.query('INSERT INTO users (name, phone,email) VALUES (?, ?,?)', [name, phone,email]);
      res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Database insertion failed' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
