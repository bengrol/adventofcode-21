const { debug } = require('console')
const fs = require('fs')

function getData(callBack, demo = true) {

    let fileToRead = './inputs/d6/input'
    fileToRead += demo ? '-demo.txt' : '.txt'

    fs.readFile(fileToRead, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        data = data.split(',')
        data.forEach((e, i, data) => {
            data[i] = parseInt(e)
        })
        callBack(data)
    })
}

var process = function () {
    const demo = true  // false for prod inputs

    getData((data) => {

        for (let index = 0; index < 80; index++) {
            data.forEach((fish, e, data) => {
                let newTimer = (fish - 1)
                if (newTimer < 0) {
                    newTimer = 6
                    data.push(8)
                }
                data[e] = newTimer
            })
        }
        console.log('--- data som of fish  ', data.length)
    }, demo)
}
exports.process = process