const fs = require('fs')

function getData(callBack, demo = true) {

    let fileToRead = './inputs/d5/input'
    fileToRead += demo ? '-demo.txt' : '.txt'

    fs.readFile(fileToRead, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        var gridDimenssions = { 'line': 0, 'col': 0 }
        data = data.split('\n')
        data.forEach((element, index, data) => {
            var tab = element.split(' -> ')
            tab.forEach((subEl, index) => {
                const res = subEl.split(',')
                const col = parseInt(res[0])
                const line = parseInt(res[1])

                if (line > gridDimenssions.line) {
                    gridDimenssions.line = line
                }
                if (col > gridDimenssions.col) {
                    gridDimenssions.col = col
                }
                tab[index] = { col, line }
            })
            data[index] = tab
        })
        callBack(data, gridDimenssions)
    })
}

var process = function () {
    const demo = false  // false for prod inputs
    getData((data, gridDimenssions) => {

        var processableLines = []
        data.forEach((line) => {
            if (line[0].line == line[1].line) {
                line.process = 'inLine'
                processableLines.push(line)
            }
            if (line[0].col == line[1].col) {
                line.process = 'inCol'
                processableLines.push(line)
            }
        })

        var grid = []
        for (let index = 0; index < (gridDimenssions.line + 1); index++) {
            var line = []
            for (let index = 0; index < (gridDimenssions.col + 1); index++) {
                line.push(0)
            }
            grid.push(line)
        }
        var valueUpTo = 0
        processableLines.forEach((element) => {
            if (element.process == 'inLine') {
                const start = element[0].col
                const end = element[1].col
                if (start < end) {
                    for (let index = start; index <= end; index++) {
                        grid[element[0].line][index]++
                        if (grid[element[0].line][index] == 2) {
                            valueUpTo++
                        }
                    }
                } else {
                    for (let index = start; index >= end; index--) {
                        grid[element[0].line][index]++
                        if (grid[element[0].line][index] == 2) {
                            valueUpTo++
                        }
                    }
                }

            }
            if (element.process == 'inCol') {
                const start = element[0].line
                const end = element[1].line
                if (start < end) {
                    for (let index = start; index <= end; index++) {
                        grid[index][element[0].col]++
                        if (grid[index][element[0].col] == 2) {
                            valueUpTo++
                        }
                    }
                } else {
                    for (let index = start; index >= end; index--) {
                        grid[index][element[0].col]++
                        if (grid[index][element[0].col] == 2) {
                            valueUpTo++
                        }
                    }
                }

            }
        })

        // grid.forEach((line) => {
        //     console.log(line.join('').replace(/0/g, '.'))
        // })

        console.log('--- valueUpTo 2 ', valueUpTo)
    }, demo)
}

exports.process = process