export const constants = {
  ERROR: {
    QUERY: 'Query failed',
    NO_ENTRY_FOUND: 'No patient found',
    NO_QUERY: 'No query provided',
    SERVER: 'Internal server error',
    QUERY_DENIED: 'Query denied',
  },
  MSG: {
    INSERT_SUCCESS: 'Successfully inserted {0} patient(s)',
  },
  BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://127.0.0.1:5502',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '3306',
  DB_NAME: process.env.DB_NAME || 'comp4537',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
}