import express from "express";
import { get } from 'http'

const app = express()
const port = process.env.PORT || 6969 // Server port
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/


app.get('/query', (req, res) => {
    let targetUrl = JSON.stringify(req.query.url).trim()
    
    if (!targetUrl) {
        res.send('URL not given')
        return
    }

    if (!targetUrl.match(urlRegex)) {
        res.send('url parameter does not match')
        return
    }

    get('http://www.google.com/', targetRes => {
        targetRes.setEncoding('utf-8')
        targetRes.on('data', d => res.send(d))
    }).on('error', console.error)
})


app.listen(port, () => {
    console.log(`API Server started on ${port}.`)
})