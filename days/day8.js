const { debug } = require('console')
const fs = require('fs')

function getData(callBack, demo = true) {

    let fileToRead = './inputs/d8/input'
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
    console.log('--- --- data ---- ')

    getData((data,) => {
        var sum = 0
        data.forEach((line) => {
            const mixedPatternString = line.split(' | ')[0].split(' ')
            const display = line.split(' | ')[1].split(' ')

            //console.log('--- --- line => ', line)

            var mixedPattern = {}
            mixedPatternString.forEach((val) => {
                // const pattern = findPatttern(val)
                if (!(val.length in mixedPattern)) {
                    mixedPattern[val.length] = []
                }
                mixedPattern[val.length].push(val)

            })

            mixedPattern = buildPatterns(mixedPattern)
            var LineSum = 0
            display.forEach((e) => {
                const displayNumber = matchPattern(e, mixedPattern)
                console.log('----- ----- ------- displayNumber ', displayNumber)
                LineSum += ""+displayNumber

            })

            console.log('----- ----- ------- LineSum ', LineSum)
            sum += parseInt(LineSum)

        })


       console.log('--- sum => ', sum)
    }, demo)
}

function buildPatterns(mixedPattern) {
    const segmentA = findDiff(mixedPattern[3][0], mixedPattern[2][0])
    const candidatCF = findDiff(mixedPattern[3][0],segmentA)
    const candidatBD = findDiff(mixedPattern[4][0],mixedPattern[2][0])
    const candidatECD = filterDiff(mixedPattern[6][0], mixedPattern[6][1], mixedPattern[6][2])
    const segmentD = findComon(candidatBD, candidatECD)
    const segmentB = findDiff(candidatBD, segmentD)
    const segmentC = findComon(candidatCF, candidatECD)
    const segmentF = findDiff(candidatCF, segmentC)
    const segmentE = findDiff(findDiff(candidatECD, segmentD), segmentC)
    const segmentG = findDiff(mixedPattern[7][0],segmentA+segmentB+segmentC+segmentD+segmentE+segmentF )

    const candidatDC = findDiff(candidatECD, candidatBD)

    const patterns = [
        { value: segmentA + segmentB + segmentC + segmentE + segmentF + segmentG },
        { value: segmentC + segmentF },
        { value: segmentA + segmentC + segmentD + segmentE + segmentG },
        { value: segmentA + segmentC + segmentD + segmentF + segmentG },
        { value: segmentB + segmentC + segmentD + segmentF },
        { value: segmentA + segmentB + segmentD + segmentF + segmentG },
        { value: segmentA + segmentB + segmentD + segmentE + segmentF + segmentG },
        { value: segmentA + segmentC + segmentF },
        { value: segmentA + segmentB + segmentC + segmentD + segmentE + segmentF + segmentG },
        { value: segmentA + segmentB + segmentC + segmentD + segmentF + segmentG }
    ]

    return patterns
}

function matchPattern(display, patterns) {
    let  numberDisplay = null
    for (let index = 0; index < patterns.length; index++) {
        display = display.split('').sort().join('')
        value = patterns[index].value.split('').sort().join('')

        if(display.localeCompare(value)==0){
            numberDisplay = index
            break
        }
    }
    return numberDisplay
}

function findAllDiff(str1, str2) {
    let diff = findDiff(str1, str2);
    diff += findDiff(str2, str1);
    return diff
}

function findDiff(str1, str2) {
    let diff = "";
    str1.split('').forEach(function (val) {
        if (!str2.includes(val)) {
            diff += val
        }
    });
    return diff;
}
function findComon(str1, str2) {
    let diff = "";
    str1.split('').forEach(function (val) {
        if (str2.includes(val)) {
            diff += val
        }
    });
    return diff;
}

function filterDiff(str1, str2, str3){
    
    let diff = findDiff(str1, str2)
     diff += findDiff(str2, str3)
     diff += findDiff(str3, str1)
    return diff
}


function findPatttern(value) {
    const patterns = [
        { 'value': 1, 'segmentNb': 2, 'isUniq': true },
        { 'value': 2, 'segmentNb': 5, 'isUniq': false },
        { 'value': 3, 'segmentNb': 5, 'isUniq': false },
        { 'value': 4, 'segmentNb': 4, 'isUniq': true },
        { 'value': 5, 'segmentNb': 5, 'isUniq': false },
        { 'value': 6, 'segmentNb': 6, 'isUniq': false },
        { 'value': 7, 'segmentNb': 3, 'isUniq': true },
        { 'value': 8, 'segmentNb': 7, 'isUniq': true },
        { 'value': 9, 'segmentNb': 6, 'isUniq': false },
        { 'value': 0, 'segmentNb': 6, 'isUniq': false }
    ]

    let pattern
    for (let index = 0; index < patterns.length; index++) {
        const element = patterns[index];
        if (value.length == element.segmentNb) {
            pattern = patterns[index]
            break;
        }
    }

    return pattern
}

exports.process = process