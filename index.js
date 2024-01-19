import express from 'express'
import eurobet from './Eurobet/eurobet.js'
//import continuousAsyncEurobet from './Eurobet/eurobet.js'

const server = express()

const port = 3000

function getData() {
    eurobet()
    //continuousAsyncEurobet(250)
}

server.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
    getData()
})