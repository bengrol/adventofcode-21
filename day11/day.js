const { debug } = require('console')
const fs = require('fs')
const flashedFlag = 'flashed'

function getData(callBack, demo = true) {

    let fileToRead = './day11/inputs/input'
    fileToRead += demo ? '-demo.txt' : '.txt'

    fs.readFile(fileToRead, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        data = data.split('\n')
        data.forEach((element, i, data) => {
            data[i] = element.split('').map(function (x) {
                return parseInt(x, 10);
            });
        });
        callBack(data)
    })
}
const process = function () {

    const demo = false  // false for prod inputs
    getData((data) => {

        let sumOfFlash = 0
        // console.log('--- --- ', inputs)

        const sumOfOctopus = data.length * data[0].length

        let keep = true
        let nbOfStep = 0
        while (keep) {
            nbOfStep ++
            sumOfFlash = processFlash(data, sumOfFlash)
            if(sumOfFlash==sumOfOctopus){
                keep = false
                console.log('***** ***** **** nbOfStep => ', nbOfStep)
            }
            if(nbOfStep>196){
                debug
            }

            
        }
        
        // console.log('--- --- data => ', data)
        // console.log('--- --- ssumOfFlash => ', sumOfFlash)
    }, demo)

}

function processFlash(data, sumOfFlash) {


    let casesToFlash = []
    // step 1
    data.forEach((ligne, ligneIndex) => {
        ligne.forEach((valeur, colonneIndex) => {
            if (valeur === 9) {
                casesToFlash.push({ ligneIndex, colonneIndex })
            }
            data[ligneIndex][colonneIndex]++
            //  console.log('--- --- --- --- valeur // ligne // colonne ', valeur, ligneIndex, colonneIndex)
        });
    });
    // console.log('--- --- step 1  data => ', data)
    // step 2 apply fash

    var keep = true
    while (keep) {
        keep = false
        // let length = casesToFlash.length
        // console.log('--- --- --- while loop casesToFlash ', casesToFlash)
        if (casesToFlash.length > 0) {
            const newcasesToFlash = applyFlash(casesToFlash, data)
            if (newcasesToFlash.length > 0) {
                casesToFlash = casesToFlash.concat(newcasesToFlash)
                keep = true
            }
        }


    }



    // reset flashedFlag
    casesToFlash.forEach((caseToFlash) => {
        data[caseToFlash.ligneIndex][caseToFlash.colonneIndex] = 0
        sumOfFlash++
    })
    // console.log('--- --- data => ', data)
    return casesToFlash.length

}


function applyFlash(casesToFlash, data) {
    if (casesToFlash.length == 0) {
        return casesToFlash
    }
    let newCasesToFlash = []
    casesToFlash.forEach((caseToFlash) => {

        let ligneIndex = caseToFlash.ligneIndex
        let colonneIndex = caseToFlash.colonneIndex

        if (data[ligneIndex][colonneIndex] !== flashedFlag) {
            data[ligneIndex][colonneIndex] = flashedFlag
            // check ligne -1 
            if (typeof data[ligneIndex - 1] != 'undefined') {
                ligneIndex--
                const re = flash(data, ligneIndex, colonneIndex)
                if (re) {
                    newCasesToFlash.push(re)
                }
                if (typeof data[ligneIndex][colonneIndex - 1] != 'undefined') {
                    const re = flash(data, ligneIndex, colonneIndex - 1)
                    if (re) {
                        newCasesToFlash.push(re)
                    }
                }
                if (typeof data[ligneIndex][colonneIndex + 1] != 'undefined') {
                    const re = flash(data, ligneIndex, colonneIndex + 1)
                    if (re) {
                        newCasesToFlash.push(re)
                    }
                }
            }

            ligneIndex = caseToFlash.ligneIndex
            colonneIndex = caseToFlash.colonneIndex

            // check colonne -1 
            if (typeof data[ligneIndex][colonneIndex - 1] != 'undefined') {
                colonneIndex--
                const re = flash(data, ligneIndex, colonneIndex)
                if (re) {
                    newCasesToFlash.push(re)
                }
                // check diag
                if (typeof data[ligneIndex + 1] != 'undefined') {
                    const re = flash(data, ligneIndex + 1, colonneIndex)
                    if (re) {
                        newCasesToFlash.push(re)
                    }
                }
            }

            ligneIndex = caseToFlash.ligneIndex
            colonneIndex = caseToFlash.colonneIndex
            // check colone +1 
            if (typeof data[ligneIndex][colonneIndex + 1] != 'undefined') {
                colonneIndex++
                const re = flash(data, ligneIndex, colonneIndex)
                if (re) {
                    newCasesToFlash.push(re)
                }
                // check diag
                if (typeof data[ligneIndex + 1] != 'undefined') {
                    const re = flash(data, ligneIndex + 1, colonneIndex)
                    if (re) {
                        newCasesToFlash.push(re)
                    }
                }

            }

            ligneIndex = caseToFlash.ligneIndex
            colonneIndex = caseToFlash.colonneIndex
            // check ligne +1 
            if (typeof data[ligneIndex + 1] != 'undefined') {
                ligneIndex++
                const re = flash(data, ligneIndex, colonneIndex)
                if (re) {
                    newCasesToFlash.push(re)
                }
            }

            ligneIndex = caseToFlash.ligneIndex
            colonneIndex = caseToFlash.colonneIndex
        }

    }, data)

    return newCasesToFlash
}

function flash(data, ligneIndex, colonneIndex) {
    if (data[ligneIndex][colonneIndex] == flashedFlag) {
        return
    }
    data[ligneIndex][colonneIndex]++
    if (data[ligneIndex][colonneIndex] == 10) {
        return { ligneIndex, colonneIndex }
    }
    return
}

exports.process = process