import http from 'http'

import { CONSTANTS } from './constants.js'

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080'
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://127.0.0.1:5502'
const dictionary = []
let post_req_count = 0
let get_req_count = 0

const server = http.createServer()

server.on('request', (req, res) => {
  const url = new URL(req.url, BASE_URL)
  const pathname = url.pathname.replace(/^\/api\//, '')

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

  try {
    if ((/^definitions(\/)?$/).test(pathname)) {

      if (req.method === 'POST') {
        const count = ++post_req_count
        let body = []
        req.on('data', (chunk) => {
          body.push(chunk)
        }).on('end', () => {
          body = Buffer.concat(body).toString()
          const { word, definition } = JSON.parse(body || '{}')
  
          if (!word || !definition) {
            res.writeHead(400, resHeader)
            res.end(JSON.stringify({ error: CONSTANTS.ERROR.DID_NOT_GET_W_D, count }))
          } else if ((/[0-9\s]/).test(word) || (/[0-9]/).test(definition)) {
            res.writeHead(400, resHeader)
            res.end(JSON.stringify({ error: CONSTANTS.ERROR.INVALID_W_D, count }))
          } else {
            const wordObj = dictionary.find(w => w.word === word)
            res.writeHead(200, resHeader)

            if (wordObj) {
              res.write(JSON.stringify({ message: CONSTANTS.WARNING.WORD_EXISTS.replace('{0}', wordObj.word), count }))
            } else {
              dictionary.push({ word, definition })
              res.write(JSON.stringify({ message: CONSTANTS.MSG.NEW_ENTRY_ADDED.replace('{0}', word).replace('{1}', definition), count }))
            }
  
            res.end()
          }
        })
  
      } else if (req.method === 'GET') {
        const count = ++get_req_count
        const word = url.searchParams.get('word')
  
        if (!word) {
          res.writeHead(400, resHeader)
          res.end(JSON.stringify({ error: CONSTANTS.ERROR.DID_NOT_GET_W, count }))
        } else {
          const wordObj = dictionary.find(w => w.word === word)
          
          if (wordObj) {
            const definition = wordObj.definition
            res.writeHead(200, resHeader)
            res.end(JSON.stringify({ word, definition, count }))
          } else {
            res.writeHead(404, resHeader)
            res.end(JSON.stringify({ error: CONSTANTS.ERROR.WORD_NOT_FOUND.replace('{0}', word), count }))
          }
  
        }
      } else {
        res.writeHead(405, resHeader)
        res.end(JSON.stringify({ error: CONSTANTS.ERROR.INVALID_REQ_METHOD }))
      }
    } else {
      res.writeHead(404, resHeader)
      res.end(JSON.stringify({ error: CONSTANTS.ERROR.INVALID_ENPOINT }))
    }
  } catch (err) {
    console.log(err)
    res.writeHead(500, resHeader)
    res.end(JSON.stringify({ error: CONSTANTS.ERROR.SERVER_ERROR }))
  }
})

server.listen(8080)
console.log(`Server running at ${BASE_URL}`)