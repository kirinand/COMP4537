import { createServer } from 'http'
import fs from 'fs'

import { getDate } from './modules/utils.js'

const baseURL = process.env.BASE_URL || 'http://localhost:8080/'
const fileName = 'file.txt'

createServer((req, res) => {
    const url = new URL(req.url, baseURL)
    const pathnames = url.pathname.split('/').filter(s => s)
    if (pathnames[0] === 'getDate') {
        const name = url.searchParams.get('name') || 'Anonymous'
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(getDate(name))
    } else if (pathnames[0] === 'writeFile') {
        const text = url.searchParams.get('text') || ''

        fs.appendFile(fileName, text, (err) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'})
                res.write('<p>Failed to write file :(</p>')
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(`<p>Successfully written to ${fileName}!</p>`)
            }
            res.end()
        })
    } else if (pathnames[0] === 'readFile') {
        const filePath = pathnames[1]

        if (filePath !== undefined) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/html'})
                    res.write(`<p>Failed to read from file ${filePath} :(</p>`)
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.write(`<p>${data}</p>`)
                }
                res.end()
            })
        } else {
            res.writeHead(400, {'Content-Type': 'text/html'})
            res.write('<p>Did not get a file name.</p>')
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end('<p>Nothing here</p>')
    }
}).listen(8080) 

console.log(`Server running at ${baseURL}`)