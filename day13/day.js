const { debug } = require('console')
const fs = require('fs')



function getData(callBack, demo = true) {

    let fileToRead = './day13/inputs/input'
    fileToRead += demo ? '-demo.txt' : '.txt'

    fs.readFile(fileToRead, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        data = data.split('\n')

        // converte to int
        data.forEach((element, i, data) => {
            data[i] = element.split(',').map(function (x) {
                return parseInt(x, 10);
            });
        });
        callBack(data)
    })
}
const process = function () {

    const demo = true  // false for prod inputs
    getData((data) => {



        console.log('--- ', data)
        // Object.keys(correspondanceTable).forEach(key => {
        //     console.log(key, correspondanceTable[key]);
        //   });

     

    }, demo)

}


exports.process = process