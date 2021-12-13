const { debug } = require('console')
const fs = require('fs')
const flashedFlag = 'flashed'
var correspondanceTable = {}

function getData(callBack, demo = true) {

    let fileToRead = './day12/inputs/input'
    fileToRead += demo ? '-demo.txt' : '.txt'

    fs.readFile(fileToRead, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        data = data.split('\n')

        // converte to int
        // data.forEach((element, i, data) => {
        //     data[i] = element.split('').map(function (x) {
        //         return parseInt(x, 10);
        //     });
        // });
        callBack(data)
    })
}
const process = function () {

    const demo = true  // false for prod inputs
    getData((data) => {

        let sumResult = 0
        data.forEach(line => {
            line = line.split('-')
            line.forEach((e, i, line) => {
                if (!(e in correspondanceTable)) {
                    correspondanceTable[e] = []
                }
                if (i == 0 && line[1] != 'start') {
                    correspondanceTable[e].push(line[1])
                }
                if (i == 1 && line[0] != 'start') {
                    correspondanceTable[e].push(line[0])
                }
            })

        });

        delete correspondanceTable.end

        // Object.keys(correspondanceTable).forEach(key => {
        //     console.log(key, correspondanceTable[key]);
        //   });

        let paths = []
        
        paths = getAvailablesPaths('start', correspondanceTable)
        paths.forEach(e => {
            let pathParcour = 'start'
            pathParcour += ' - ' + e
            const subPath = getAvailablesPaths(e, correspondanceTable, pathParcour)
            builPathRecursively(subPath, pathParcour, 1)
        })

    }, demo)

}


function builPathRecursively(paths, pathParcour, niveau = 0) {
    paths.forEach(p => {
        if (!pathParcour.includes(p) || p == p.toUpperCase()) {
            pathParcour += ' - ' + p
            if (p == 'end') {
                console.log('--- --- --- --- ', pathParcour)
            } else {
                const newpathParcour = pathParcour
                

                let paths = getAvailablesPaths(p, correspondanceTable)

                builPathRecursively(paths, newpathParcour, niveau++)
            }
        }
        debug
        // return null

    })
}

function getAvailablesPaths(entre, correspondanceTable) {
    let availablesPaths = correspondanceTable[entre]
    // remove pathParcour (minuscule ) in paths
    return availablesPaths
}
exports.process = process