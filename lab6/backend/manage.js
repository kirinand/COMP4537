import all_languages from './languages.js'
import db from './database.js'
import queries from './queries.js'

export const initDB = () => {
  db.query(queries.createLanguageTable, (err) => {
    if (err) throw err
    
    db.query(queries.createEntryTable, (err) => {
      if (err) throw err
    })
    
    all_languages.forEach((language) => {
      db.query(queries.insertLanguage, [language.code, language.name], (err) => {
        if (err) console.log(err)
      })
    })
  })
}
