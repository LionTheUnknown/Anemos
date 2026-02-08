import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: 6543,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: { require: true, rejectUnauthorized: false },
  max: 5,
});

export async function findByCityAndCountry(city, country) {
  const result = await pool.query(
    'SELECT id, city, country, count, latitude, longitude FROM weather WHERE city = $1 AND country = $2',
    [city, country]
  );
  return result.rows[0] || null;
}

export async function create(weather) {
  await pool.query(
    'INSERT INTO weather(city, country, count, latitude, longitude) VALUES ($1, $2, 1, $3, $4)',
    [weather.city, weather.country, weather.latitude, weather.longitude]
  );
}

export async function updateCountByCityAndCountry(city, country, latitude, longitude) {
  await pool.query(
    'UPDATE weather SET count = count + 1, latitude = $1, longitude = $2 WHERE city = $3 AND country = $4',
    [latitude, longitude, city, country]
  );
}

export async function isTop3Weather(city, country) {
  const result = await pool.query(
    `SELECT EXISTS (
      SELECT 1 FROM (
        SELECT city, country FROM weather
        ORDER BY count DESC
        LIMIT 3
      ) top3
      WHERE top3.city = $1 AND top3.country = $2
    )`,
    [city, country]
  );
  return result.rows[0].exists;
}

export async function findTop3Weather() {
  const result = await pool.query(
    'SELECT id, city, country, count, latitude, longitude FROM weather ORDER BY count DESC LIMIT 3'
  );
  return result.rows;
}

export async function findTop4Weather() {
  const result = await pool.query(
    'SELECT id, city, country, count, latitude, longitude FROM weather ORDER BY count DESC LIMIT 4'
  );
  return result.rows;
}
