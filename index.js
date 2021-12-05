const loadInput = require('./load-input.js')
//const indexD4 = require('./index-d3')

loadInput.getDataD4_1(true).then(async function (page) {
    await loadInput.getDataD4(function (data) {
        bingos = page.split('\n\n')
        bingos.forEach((bingo, index, bingos) => {
            bingo = bingo.split('\n')
            bingo.forEach((e, index, arr) => {
                arr[index] = e.split(' ').filter(e => e)
            })
            bingos[index] = bingo
        })
        console.log('--- --- bingos  => ')
        // console.log(bingos)
        var markedValuesCoordonne = []
        bingos.forEach(()=>{
            markedValuesCoordonne.push({ 'line': [0, 0, 0, 0, 0], 'col': [0, 0, 0, 0, 0], 'sumValue':0, 'lastValue':null })
        })
        for (let index = 0; index < data.length; index++) {
            const bingoResult = findInBingos(data[index], bingos, markedValuesCoordonne)
            if(bingoResult){
                
                const winningBingo = bingos[bingoResult.bingoIndex]
                var sum = 0
                winningBingo.forEach((lineBingo)=>{
                    lineBingo.forEach(e=> sum += parseInt(e))
                })
                sum -= markedValuesCoordonne[bingoResult.bingoIndex].sumValue
                sum *= markedValuesCoordonne[bingoResult.bingoIndex].lastValue
                console.log('--- --- ########## the result is => ', sum)
                break
            }

        }
    }, true)
})

function findInBingos(valueToFind, bingos, markedValuesCoordonne) {
    valueToFind = parseInt(valueToFind)
    var bingoResult = {}
    var bingoStop = false
    for (let bingoIndex = 0; bingoIndex < bingos.length; bingoIndex++) {
        const bingo = bingos[bingoIndex]
        for (let lineIndex = 0; lineIndex < bingo.length; lineIndex++) {
            const line = bingo[lineIndex]
            for (let index = 0; index < line.length; index++) {
                if (parseInt(line[index]) == valueToFind) {
                    markedValuesCoordonne[bingoIndex].sumValue += valueToFind
                    markedValuesCoordonne[bingoIndex].lastValue = valueToFind
                    markedValuesCoordonne[bingoIndex].line[lineIndex]++
                    if (markedValuesCoordonne[bingoIndex].line[lineIndex] == 5) {
                        bingoResult = {bingoIndex :bingoIndex, line: lineIndex}
                        console.log('--- --- --- --- BINGO !!!!! Line => ', bingoResult)
                        bingoStop = true
                        break
                    }
                    markedValuesCoordonne[bingoIndex].col[index]++
                    if (markedValuesCoordonne[bingoIndex].col[index] == 5) {
                        bingoResult = {bingoIndex :bingoIndex, col: index}
                        console.log('--- --- --- --- BINGO !!!!! col => ', bingoResult)
                        bingoStop = true
                        break
                    }
                }
            }
            if(bingoStop == true){
                break
            }
        }
        if(bingoStop == true){
            break
        }
    }
    if(bingoStop == true){
        return bingoResult
    }     
}