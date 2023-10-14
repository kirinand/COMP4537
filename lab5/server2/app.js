import mysql from 'mysql2'
import http from 'http'

import { constants } from './constants.js'

const BASE_URL = constants.BASE_URL
const FRONTEND_URL = constants.FRONTEND_URL
const DB_HOST = constants.DB_HOST

const db = mysql.createConnection({
  host: DB_HOST,
  user: 'root',
  password: '',
  database: constants.DB_NAME,
  multipleStatements: true,
})

const server = http.createServer()

db.connect((err) => {
  if (err) throw err
  console.log('Connected to database')

  const createTableSql = "CREATE TABLE IF NOT EXISTS patient (patientid int(11) PRIMARY KEY AUTO_INCREMENT, name varchar(100) NOT NULL, dateOfBirth datetime NOT NULL) Engine=InnoDB;"
  const createUserSql = `CREATE USER IF NOT EXISTS '{0}'@'${constants.DB_HOST}';`
  const grantSelectSql = `REVOKE ALL PRIVILEGES ON *.* FROM '{0}'@'${constants.DB_HOST}'; GRANT SELECT ON ${constants.DB_NAME}.patient TO '{0}'@'${constants.DB_HOST}';`
  const grantInsertSql = `REVOKE ALL PRIVILEGES ON *.* FROM '{0}'@'${constants.DB_HOST}'; GRANT INSERT ON ${constants.DB_NAME}.patient TO '{0}'@'${constants.DB_HOST}';`
  db.query(createTableSql, (err) => {
    if (err) throw err
  })
  db.query(createUserSql.replaceAll('{0}', 'getAgent') + createUserSql.replaceAll('{0}', 'postAgent'), (err) => {
    if (err) { 
      throw err 
    } else {
      db.query(grantSelectSql.replaceAll('{0}', 'getAgent') + grantInsertSql.replaceAll('{0}', 'postAgent'), (err) => {
        if (err) throw err
      })
    }
  })
})

server.on('request', (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': FRONTEND_URL,
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  const resHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': FRONTEND_URL,
  }

  const url = new URL(req.url, BASE_URL)

  try {
    if (req.method === 'GET') {
      const query = url.searchParams.get('query')

      if (query) {
        const cnx = mysql.createConnection({
          host: DB_HOST,
          user: 'getAgent',
          password: '',
          database: constants.DB_NAME,
          multipleStatements: true,
        })
        cnx.query(query, (err, result) => {
          if (err) {
            console.log(err)
            res.writeHead(500, resHeader)
            res.end(JSON.stringify({ error: constants.ERROR.QUERY }))
          } else if (!result || result.length === 0) {
            res.writeHead(404, resHeader)
            res.end(JSON.stringify({ error: constants.ERROR.NO_ENTRY_FOUND }))
          } else {
            res.writeHead(200, resHeader)
            res.end(JSON.stringify({ data: result }))
          }
          cnx.end()
        })
      } else {
        res.writeHead(400, resHeader)
        res.end(JSON.stringify({ error: constants.ERROR.NO_QUERY }))
      }
  
    } else if (req.method === 'POST') {
      let body = []
      req.on('data', (chunk) => {
        body.push(chunk)
      }).on('end', () => {
        body = Buffer.concat(body).toString()
        const { query } = JSON.parse(body || '{}')
        
        if (query) {
          const cnx = mysql.createConnection({
            host: DB_HOST,
            user: 'postAgent',
            password: '',
            database: constants.DB_NAME,
            multipleStatements: true,
          })
          cnx.query(query, (err, result) => {
            if (err) {
              console.log(err)
              res.writeHead(500, resHeader)
              res.end(JSON.stringify({ error: constants.ERROR.QUERY }))
            } else{
              res.writeHead(200, resHeader)
              res.end(JSON.stringify({ message: constants.MSG.INSERT_SUCCESS.replace('{0}', result.affectedRows) }))
            }
            cnx.end()
          })
        } else {
          res.writeHead(400, resHeader)
          res.end(JSON.stringify({ error: constants.ERROR.NO_QUERY }))
        }
      })
    }
  } catch (err) {
    console.log(err)
    res.writeHead(500, resHeader)
    res.end(JSON.stringify({ error: constants.ERROR.SERVER }))
  }

  
})

server.listen(8080)
console.log(`Server running at ${BASE_URL}`)