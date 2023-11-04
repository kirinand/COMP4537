const queries = {
  getLanguages: 'SELECT code, name FROM language',
  getEntry: 'SELECT * FROM entry WHERE word = $1',
  insertEntry: 'INSERT INTO entry (word, definition, word_language, definition_language) VALUES ($1, $2, $3, $4)',
  updateEntry: 'UPDATE entry SET definition = $1 WHERE word = $2',
  deleteEntry: 'DELETE FROM entry WHERE word = $1',
  createEntryTable: 'CREATE TABLE IF NOT EXISTS entry (id SERIAL PRIMARY KEY, word VARCHAR(255) UNIQUE NOT NULL, definition VARCHAR NOT NULL, word_language VARCHAR(8) REFERENCES language(code) NOT NULL, definition_language VARCHAR(8) REFERENCES language(code) NOT NULL)',
  createLanguageTable: 'CREATE TABLE IF NOT EXISTS language (code VARCHAR(8) PRIMARY KEY, name VARCHAR(64) UNIQUE NOT NULL)',
  insertLanguage: 'INSERT INTO language (code, name) VALUES ($1, $2)',
  getTotalEntries: 'SELECT COUNT(*) FROM entry',
}

export default queries