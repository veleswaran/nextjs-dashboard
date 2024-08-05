// lib/db.js
import { Pool } from 'pg';

// Use POSTGRES_URL or another relevant variable based on your needs
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Configure based on your PostgreSQL provider's SSL requirements
  },
});

export default pool;
