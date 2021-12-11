const { debug } = require('console')
const fs = require('fs')
const closingSignes = []
const illegalCharacterPattern = {
}


function getData(callBack, demo = true) {

    let fileToRead = './day11/inputs/input'
    fileToRead += demo ? '-demo.txt' : '.txt'

    fs.readFile(fileToRead, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        data = data.split('\n')
        callBack(data)
    })
}
var process = function () {

    const demo = false  // false for prod inputs
    getData((inputs) => {

        console.log('loggggg', inputs)

    }, demo)

}




exports.process = process