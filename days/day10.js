const { debug } = require('console')
const fs = require('fs')
const closingSignes = [')', ']', '>', '}']
const illegalCharacterPattern = {
    ')': { 'points': 3, 'sum': 0, 'total': 0 },
    ']': { 'points': 57, 'sum': 0, 'total': 0 },
    '}': { 'points': 1197, 'sum': 0, 'total': 0 },
    '>': { 'points': 25137, 'sum': 0, 'total': 0 },
}


function getData(callBack, demo = true) {

    let fileToRead = './inputs/d10/input'
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

        //resolveIllegalCharacters(inputs)
        resolveIncomplete(inputs)

    }, demo)

}

function getillegalCharacter(inputs, incomplete = false) {

    // reduce string 
    const signes = ['()', '[]', '<>', '{}', '&lt;&gt;']
    let keep = true
    while (keep == true) {

        const length = inputs.length
        signes.forEach((e) => {
            inputs = inputs.replace(e, '')
        })

        if (length === inputs.length) {
            keep = false
        }
    }

    // find illegalCharacter
    let illegalCharacter = null
    let index = inputs.length + 1
    closingSignes.forEach((e) => {

        const indexOf = inputs.indexOf(e)
        if (indexOf != -1) {
            //console.log('--- --- index ??')
            if (index > indexOf) {
                index = indexOf
                illegalCharacter = e
            }
        }

        //console.log('--- --- index of x ', e, indexOf)
    })

    //console.log('--- --- illegalCharacter ', illegalCharacter)

    if (incomplete) {
        if (illegalCharacter == null) {
            return inputs
        }
        return null
    }

    return illegalCharacter
}

function resolveIllegalCharacters(inputs) {


    inputs.forEach((input) => {
        let illegalCharacter = getillegalCharacter(input)
        if (illegalCharacter) {
            illegalCharacterPattern[illegalCharacter].sum++
            illegalCharacterPattern[illegalCharacter].total = illegalCharacterPattern[illegalCharacter].points * illegalCharacterPattern[illegalCharacter].sum
        }
    })

    let sumIllegal = 0
    closingSignes.forEach((e) => {
        sumIllegal += illegalCharacterPattern[e].total

    })

    console.log('--- --- illegal result => ', sumIllegal)
}

function resolveIncomplete(inputs) {


    let incompletes = []
    inputs.forEach((input) => {
        const correspondanceSignes = {
            '(': { 'clossing': ')', 'points': 1, 'sum': 0 },
            '{': { 'clossing': '}', 'points': 3, 'sum': 0 },
            '[': { 'clossing': ']', 'points': 2, 'sum': 0 },
            '<': { 'clossing': '>', 'points': 4, 'sum': 0 },
        }
        let incomplete = getillegalCharacter(input, true)

        if (incomplete) {
            let sumIncomplete = 0
            incomplete = incomplete.split('').reverse()
            incomplete.forEach((e) => {
                sumIncomplete *= 5
                sumIncomplete += correspondanceSignes[e].points
            })
            
            incompletes.push(sumIncomplete)
            console.log('--- --- sumIncomplete result => ', sumIncomplete)


        }
    })

    incompletes.sort(function(a, b){
        return a-b
    })

    const av = Math.floor(incompletes.length/2)
    console.log('--- --- tab ', incompletes, av)
    console.log('--- --- sumIncomplete result => ', incompletes[av])


}

exports.process = process