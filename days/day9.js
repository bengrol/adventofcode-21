const { debug } = require('console')
const fs = require('fs')

function getData(callBack, demo = true) {

    let fileToRead = './inputs/d9/input'
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
function getBassinForLowPoint(lowPoint, data) {
    let cases = [lowPoint]
    let keepScanne = true

    while (keepScanne) {
        keepScanne = false
        const newCases = scanneCases(cases, data)
        if (newCases.length > 0) {
            keepScanne = true
            cases = [...newCases, ...cases]

        }

    }

    return cases
}



function scanneCases(cases, data) {
    const scannedStatus = 'scanned'

    let newPoints = []
    for (let index = 0; index < cases.length; index++) {

        if (cases[index].state == scannedStatus) {
            continue
        }
        const element = cases[index];
        element.state = scannedStatus
        data[element.line][element.col] = scannedStatus

        if ('undefined' !== typeof data[element.line][element.col + 1]) {
            let v = data[element.line][element.col + 1];
            if (v < 9 && v !== scannedStatus) {
                newPoints.push({
                    line: element.line,
                    col: element.col + 1,
                })
                data[element.line][element.col + 1] = scannedStatus
            }
        }
        if ('undefined' !== typeof data[element.line][element.col - 1]) {
            let v = data[element.line][element.col - 1]
            if (v < 9 && v !== scannedStatus) {
                newPoints.push({
                    line: element.line,
                    col: element.col - 1,
                })
                data[element.line][element.col - 1] = scannedStatus
            }

        }
        if ('undefined' !== typeof data[element.line + 1] && 'undefined' !== typeof data[element.line + 1][element.col]) {
            let v = data[element.line + 1][element.col]
            if (v < 9 && v !== scannedStatus) {
                newPoints.push({
                    line: element.line + 1,
                    col: element.col,
                })
                data[element.line + 1][element.col] = scannedStatus
            }

        }
        if ('undefined' !== typeof data[element.line - 1] && 'undefined' !== typeof data[element.line - 1][element.col]) {
            let v = data[element.line - 1][element.col]
            if (v < 9 && v !== 'scanned') {
                newPoints.push({
                    line: element.line - 1,
                    col: element.col,
                })
                data[element.line - 1][element.col] = scannedStatus
            }

        }
    }
    return newPoints
}


function getAllBassins(lowPoints, data) {
    let bassins = []
    lowPoints.forEach((e) => {
        let bassin = getBassinForLowPoint(e, data)
        bassins.push(bassin)

    })

    bassins.sort(function(a, b) {
        return b.length - a.length;
      });

    return bassins.slice(0,3)
}

var process = function () {
    const demo = false  // false for prod inputs
    getData((data) => {
        data.forEach((line, i, data) => {
            line = line.split('')
            line.forEach((value, j, current) => {
                current[j] = parseInt(value)
            }
            )
            data[i] = line
        })
        let lowPoints = []
        data.forEach((line, i, data) => {
            line.forEach((value, j, currenteline) => {
                let condition = 0 // must be equal to 4 
                //console.log('--- --- value ', value)
                // check left
                if (j == 0) {
                    condition++
                } else {
                    if (currenteline[j - 1] > value) {
                        condition++
                    }
                }

                //check right
                if (typeof currenteline[j + 1] == 'undefined') {
                    condition++
                } else {
                    if (currenteline[j + 1] > value) {
                        condition++
                    }
                }

                // check up
                if (i == 0) {
                    condition++
                } else {
                    if (value < data[i - 1][j]) {
                        condition++
                    }
                }

                // check bottom
                if (typeof data[i + 1] == 'undefined') {
                    condition++
                } else {
                    if (value < (data[i + 1][j])) {
                        condition++
                    }
                }

                if (condition == 4) {
                    lowPoints.push({ line: i, col: j, state: 'new' })
                }
            })
        })

        console.log('--- ---- ----  lowPoints value => ', lowPoints)

        let bassins = getAllBassins(lowPoints, data)
        let sum = bassins[0].length * bassins[1].length * bassins[2].length 


        console.log('--- --- result => ', sum)
    }, demo)
}

exports.process = process