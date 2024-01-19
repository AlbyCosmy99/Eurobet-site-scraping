import fetch, { fileFrom } from "node-fetch"
import fs from 'fs'
import CONSTS from "./const.js"

function eurobet(singleFile, groupFileName) {
    //start time
    //console.time("myTimer");

    fetch("https://www.eurobet.it/live-homepage-service/sport-schedule/services/live-homepage/live?prematch=0&live=1")
    .then(res => res.json())
    .then(data => {
        if(!data?.result) {
            //every now and then data.result is undefined probably due to our frequent requests
           return
        }
        const sports = data.result.itemList.length
        for(let i = 0;i<sports;i++) {
            const matches = data.result.itemList[i].itemList.length

            for(let j = 0;j<matches;j++) {
                const matchDetails = CONSTS.FULL_URL_FIRST + data.result.itemList[i].itemList[j].breadCrumbInfo.fullUrl + CONSTS.FULL_URL_SECOND + '\n'
                fetch(matchDetails)
                .then(res => res.json())
                .then(res => {
                    let sport = data.result.itemList[i].itemList[j].eventInfo.disciplineDescription || ''
                    let nation = data.result.itemList[i].itemList[j].eventInfo.countryDescription || ''
                    let competition = data.result.itemList[i].itemList[j].eventInfo.meetingDescription || ''
                    let match = data.result.itemList[i].itemList[j].eventInfo.eventDescription || ''
                    let score = `${data.result.itemList[i].itemList[j].eventInfo.teamHome.score}-${data.result.itemList[i].itemList[j].eventInfo.teamAway.score}` || ''
                    let timeLive = data.result.itemList[i].itemList[j].eventInfo.timeLive || ''

                    let betsList = res?.result?.betGroupList
                    
                    if(!betsList) {
                        betsList = []
                    }
                    
                    let bets = {}

                    betsList.forEach(elem => {
                        let betOdds = {}
                        let odds = elem.oddGroupList[0].oddList
                        odds.forEach(elem => {
                            betOdds[elem.oddDescription] = (elem.oddValue/100).toFixed(2)
                        })
                        //attenzione a key: contiene duplicati ogni tanto
                        let key = `${elem.oddGroupList[0].oddGroupDescription} ${elem.oddGroupList[0].additionalDescription ?? ''}`.trim()
                        bets[key] = {
                            betOdds
                        }
                    })

                    let matchContent = `----------\n
                    Sport: ${sport}
                    Nation: ${nation}
                    Competition: ${competition}
                    Match: ${match}
                    Score: ${score}
                    Time live: ${timeLive}
                    Bets available: ${JSON.stringify(bets)}
                    \n
                    `

                    if(!res.result) {
                        matchContent = `----------\nPartita non disponibile: ${res.status}\n${matchDetails}\n`
                    }
                  
                    let filename = `Eurobet/files/${groupFileName}_eurobet.txt`

                    if(singleFile) {
                        filename = `Eurobet/files/eurobet.txt`
                    }

                    fs.appendFile(filename, matchContent, (err) => {
                        if (err) {
                        console.error('An error occurred while adding in the file:', err);
                        return;
                        }                  
                    });
                    })
                .catch(err => {
                    console.log(err)
                })       
            }
        }
    })
    .then(() => {
        //console.timeEnd('myTimer')
    })
    .catch(err => {
        console.log(err.message)
    })
}

//interval should be >=250ms !!! - otherwise potential bugs are possible
export default function continuousAsyncEurobet(interval = 1000, singleFile = true) {
    setInterval(() => {
        eurobet(singleFile, Math.random().toString(36).substring(2))
    }, interval);
}