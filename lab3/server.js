import { createServer } from 'http'

import { getDate } from './modules/utils.js'

const baseURL = process.env.BASE_URL || 'http://localhost:8080/'

createServer((req, res) => {
    const url = new URL(req.url, baseURL)

    if (url.pathname === '/getdate') {
        const name = url.searchParams.get('name') || 'Anonymous'
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(getDate(name))
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end('<p>Nothing here</p>')
    }
}).listen(8080) 

console.log(`Server running at ${baseURL}`)