import pg from 'pg'
import { config } from 'dotenv'

config()
const { Pool } = pg

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

export default db