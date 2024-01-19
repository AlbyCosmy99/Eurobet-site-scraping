import express from 'express'
import continuousAsyncEurobet from './Eurobet/eurobet.js'

const server = express()

const port = 3000

function getData() {
    continuousAsyncEurobet(500)
}

server.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
    getData()
})