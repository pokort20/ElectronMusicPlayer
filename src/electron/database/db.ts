import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MusicPlayer',
  password: 'admin',
  port: 5432,
});

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}
