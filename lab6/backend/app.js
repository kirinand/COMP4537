import express from 'express'
import { config } from 'dotenv'

import db from './database.js'
import constants from './constants.js'
import queries from './queries.js'
import { getTotalEntries } from './utils.js'
import { initDB } from './manage.js'

config()
initDB()
const app = express()

app.use(express.json())

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  next()
})

app.options('*', (_, res) => {
  res.status(204).send()
})

app.get('/api/definition/:word', (req, res) => {
  const word = req.params.word
  db.query(queries.getEntry, [word], async (err, result) => {
    if (err) {
      const error = constants.err[500]
      res.status(500).json({ error, word })
    } else if (!result.rowCount) {
      const error = constants.err.entryNotFound
      const message = constants.msg.wordNotExists.replace('{0}', word)
      res.status(404).json({ error, message })
    } else {
      const { rows: [ entry ]} = result
      res.status(200).json({ entry })
    }
  })
})

app.patch('/api/definition/:word', async (req, res) => {
  const body = req.body
  const word = req.params.word || body.word
  const definition = body.definition
  const entry = { word, definition }

  const missingFields = Object.entries(entry).reduce((acc, [key, value]) => {
    if (!value) {
      acc.push(key)
    }
    return acc
  }, [])

  if (missingFields.length) {
    const message = constants.msg.entryMissingFields.replace('{0}', missingFields.join(', '))
    const total = await getTotalEntries()
    res.status(400).json({ message, entry, total })
  } else {
    db.query(queries.updateEntry, [definition, word], async (err, result) => {
      const total = await getTotalEntries()

      if (err) {
        const error = constants.err[500]
        res.status(500).json({ error, entry, total })
      } else if (!result.rowCount) {
        const error = constants.err.entryNotFound
        const message = constants.msg.wordNotExists.replace('{0}', word)
        res.status(404).json({ error, message, entry, total })
      } else {
        const message = constants.msg.entryUpdateSuccess
        res.status(200).json({ message, entry, total })
      }
    })
  }
  
})

app.delete('/api/definition/:word', async (req, res) => {
  const body = req.body
  const word = req.params.word || body.word
  const entry = { word }

  if (!word) {
    const message = constants.msg.queryMissingKey.replace('{0}', 'word')
    const total = await getTotalEntries()
    res.status(400).json({ message, entry, total })
  } else {
    db.query(queries.deleteEntry, [word], async (err, result) => {
      const total = await getTotalEntries()

      if (err) {
        const error = constants.err[500]
        res.status(500).json({ error, entry, total })
      } else if (!result.rowCount) {
        const error = constants.err.entryNotFound
        const message = constants.msg.wordNotExists.replace('{0}', word)
        res.status(404).json({ error, message, entry, total })
      } else {
        const message = constants.msg.entryDeleteSuccess
        res.status(200).json({ message, entry, total })
      }
    })
  }
})

app.post('/api/definition', async (req, res) => {
  const body = req.body
  const entry = {
    word: body.word,
    definition: body.definition,
    "word-language": body["word-language"],
    "definition-language": body["definition-language"],
  }

  const missingFields = Object.entries(entry).reduce((acc, [key, value]) => {
    if (!value) {
      acc.push(key)
    }
    return acc
  }, [])

  if (missingFields.length) {
    const message = constants.msg.entryMissingFields.replace('{0}', missingFields.join(', '))
    const total = await getTotalEntries()
    res.status(400).json({ message, entry, total })
  } else {
    db.query(queries.insertEntry, [entry.word, entry.definition, entry["word-language"], entry["definition-language"]], async (err) => {
      const total = await getTotalEntries()

      if (err) {
        console.log(err)
        if (err.code === '23505') {
          const error = constants.err.wordConflict
          const message = constants.msg.wordExists.replace('{0}', entry.word)
          res.status(409).json({ error, message, entry, total })
        } else {
          const error = constants.err[500]
          res.status(500).json({ error, entry, total })
        }
      } else {
        const message = constants.msg.entryCreateSuccess
        res.status(201).json({ message, entry, total })
      }
    })
  }
})

app.get('/api/languages', (req, res) => {
  db.query(queries.getLanguages, (err, result) => {

    if (err) {
      const error = constants.err[500]
      res.status(500).json({ error })
    } else {
      const { rows: languages } = result
      res.status(200).json({ languages })
    }
  })

})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running at ${process.env.BASE_URL}`)
})
