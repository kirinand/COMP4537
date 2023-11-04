import db from './database.js'
import queries from './queries.js'

export const getTotalEntries = async () => {
  const { rows: [{ count }]} = await db.query(queries.getTotalEntries)
  return parseInt(count)
}