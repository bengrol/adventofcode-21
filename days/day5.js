const fs = require('fs')

function getData(callBack, demo = true) {

    let fileToRead = './inputs/d5/input'
    fileToRead +=  demo ? '-demo.txt' :  '.txt'

    fs.readFile(fileToRead, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        callBack(data)
    })
}

var process = function (){
    getData(e=>{
        console.log(e)
    }, true) // false for prod inputs
}

exports.process = process