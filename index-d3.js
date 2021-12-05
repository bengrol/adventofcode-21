const iterationDeepth = dataInput[0].length

function getFiltedInput(valuesToFilter, position) {
    if (position > (valuesToFilter[0].length - 1)) {
        return {}
    }
    var one = [], zero = []
    valuesToFilter.forEach((number, index) => {
        number = number.toString(2)
        const bit = number.charAt(position)
        bit == 1 ? one.push(index) : zero.push(index)
    })
    return { zero, one }
}

function calculateMostCommon(data, defaultBit) {
    if (data.zero.length > data.one.length) {
        return 'zero'
    }
    if (data.zero.length < data.one.length) {
        return 'one'
    }
    return defaultBit
}

function calculateLessCommon(data, defaultBit) {
    if (data.zero.length < data.one.length) {
        return 'zero'
    }
    if (data.zero.length > data.one.length) {
        return 'one'
    }
    return defaultBit
}

function getDataByIndex(dataToProcess, indexArray) {
    var data = []
    indexArray.forEach((e) => {
        data.push(dataToProcess[e])
    })
    return data
}

// ###########################################

var oxygenGeneratorRating = getFiltedInput(dataInput, 0)
const common = calculateMostCommon(oxygenGeneratorRating, 'one')
function getOxygenGeneratorRating(dataToProcess) {

    for (var i = 0; i < iterationDeepth; i++) {
        var indexToProcess = getFiltedInput(dataToProcess, i)
        var common = calculateMostCommon(indexToProcess, 'one')
        dataToProcess = getDataByIndex(dataToProcess, indexToProcess[common])
        if (dataToProcess.length == 1) {
            break
        }
    }
    return dataToProcess
}

var OxygenGeneratorRating = getOxygenGeneratorRating(dataInput)[0]
OxygenGeneratorRating = parseInt(OxygenGeneratorRating, 2)

function getCO2ScrubberRating(dataToProcess) {

    for (var i = 0; i < iterationDeepth; i++) {
        var indexToProcess = getFiltedInput(dataToProcess, i)
        var common = calculateLessCommon(indexToProcess, 'zero')
        dataToProcess = getDataByIndex(dataToProcess, indexToProcess[common])
        if (dataToProcess.length == 1) {
            break
        }
    }
    return dataToProcess
}

var CO2ScrubberRating = getCO2ScrubberRating(dataInput)[0]

console.log(CO2ScrubberRating)
console.log(parseInt(CO2ScrubberRating, 2))
console.log(CO2ScrubberRating * OxygenGeneratorRating)