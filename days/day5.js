const { debug } = require('console')
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
            if ('undefined' == typeof line.process) {

                if (line[0].col > line[1].col) {
                    const reversedLine = [
                        line[1],
                        line[0]
                    ]
                    line = reversedLine
                }
                line.process = 'inDiag_natural'
                if (line[0].line > line[1].line) {
                    line.process = 'inDiag_reverse'
                }

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
            let start, end
            switch (element.process) {

                case 'inLine':
                    start = element[0].col < element[1].col ? element[0].col : element[1].col
                    end = element[0].col > element[1].col ? element[0].col : element[1].col

                    for (let index = start; index <= end; index++) {
                        grid[element[0].line][index]++
                        if (grid[element[0].line][index] == 2) {
                            valueUpTo++
                        }
                    }
                    break;

                case 'inCol':
                    start = element[0].line < element[1].line ? element[0].line : element[1].line
                    end = element[0].line > element[1].line ? element[0].line : element[1].line
                    for (let index = start; index <= end; index++) {
                        grid[index][element[0].col]++
                        if (grid[index][element[0].col] == 2) {
                            valueUpTo++
                        }
                    }
                    break;

                default:
                    //debug('inDiag')
                    start = element[0].line
                    end = element[1].line

                    //if(element.process == 'inDiag_natural')

                    if (element.process == 'inDiag_reverse') {
                        let colProg = element[0].col
                        for (let index = start; index >= end; index--) {
                            grid[index][colProg]++
                            if (grid[index][colProg] == 2) {
                                valueUpTo++
                            }
                            colProg++
                        }
                    }

                    if (element.process == 'inDiag_natural') {
                        let colProg = element[0].col
                        for (let index = start; index <= end; index++) {
                            grid[index][colProg]++
                            if (grid[index][colProg] == 2) {
                                valueUpTo++
                            }
                            colProg++
                        }
                    }

                    break;
            }


        })

        // grid.forEach((line) => {
        //     console.log(line.join('').replace(/0/g, '.'))
        // })

        console.log('--- valueUpTo 2 ', valueUpTo)
    }, demo)
}

exports.process = process