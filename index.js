import express from 'express'
import continuousAsyncEurobet from './Eurobet/eurobet.js'

const server = express()

const port = 3000

//le due costanti qui sotto puoi modificarle a tuo piacimento
const MILLIS_REQUESTS = 250
const IS_ONE_FILE_TXT = false //vuoi generare un singolo file .txt o uno per ogni gruppo di partite live? se 'true', il file e' uno solo

function getData() {
    continuousAsyncEurobet(MILLIS_REQUESTS, IS_ONE_FILE_TXT)
}

server.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
    getData()
})