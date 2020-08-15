const express = require('express')
const server = express()

server.use(express.static('public'))

.get('/', (req, res) => {
    return res.sendFile(__dirname + "/index.html")
})

.listen(7000, () => {
    console.log('servidor iniciado/reiniciado...')
})