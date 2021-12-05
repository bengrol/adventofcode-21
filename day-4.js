const loadInput = require('./load-input.js')

var day4 = function(){

    loadInput.getDataD4_1().then(async function (page) {
        await loadInput.getDataD4(function (data) {
            bingos = page.split('\n\n')
            bingos.forEach((bingo, index, bingos) => {
                bingo = bingo.split('\n')
                bingo.forEach((e, index, arr) => {
                    arr[index] = e.split(' ').filter(e => e)
                })
                bingos[index] = bingo
            })
            var markedValuesCoordonne = []
            var winningBingoIndex = []
            bingos.forEach(()=>{
                markedValuesCoordonne.push({ 'line': [0, 0, 0, 0, 0], 'col': [0, 0, 0, 0, 0], 'sumValue':0, 'lastValue':null })
            })
            for (let index = 0; index < data.length; index++) {
                findInBingos(data[index], bingos, markedValuesCoordonne, winningBingoIndex)            
            }
            const lastWin = winningBingoIndex.reverse()[0]
            const winningBingo = bingos[lastWin]
            var sum = 0
            winningBingo.forEach((lineBingo)=>{
                lineBingo.forEach(e=> sum += parseInt(e))
            })
    
            sum -= markedValuesCoordonne[lastWin].sumValue
            sum *= markedValuesCoordonne[lastWin].lastValue
            console.log('--- --- ########## the result is => ', sum)
            console.log('--- winningBingoIndex => ', winningBingoIndex)
        })
    })
    
    function findInBingos(valueToFind, bingos, markedValuesCoordonne, winningBingoIndex) {
        
        valueToFind = parseInt(valueToFind)
        var bingoResult = {}
        var bingoStop = false
        for (let bingoIndex = 0; bingoIndex < bingos.length; bingoIndex++) {
            if(winningBingoIndex.indexOf(bingoIndex)> -1){
                console.log('--- --- --- bingo already win ')
                continue
            }
            const bingo = bingos[bingoIndex]
            for (let lineIndex = 0; lineIndex < bingo.length; lineIndex++) {
                const line = bingo[lineIndex]
                for (let index = 0; index < line.length; index++) {
                    if (parseInt(line[index]) == valueToFind) {
                        markedValuesCoordonne[bingoIndex].sumValue += valueToFind
                        markedValuesCoordonne[bingoIndex].lastValue = valueToFind
                        markedValuesCoordonne[bingoIndex].line[lineIndex]++
                        if (markedValuesCoordonne[bingoIndex].line[lineIndex] == 5) {
                            winningBingoIndex.push(bingoIndex)
                            bingoResult = {bingoIndex :bingoIndex, line: lineIndex}
                            console.log('--- --- --- --- BINGO !!!!! Line => ', bingoResult)
                            //bingoStop = true
                            //break
                        }
                        markedValuesCoordonne[bingoIndex].col[index]++
                        if (markedValuesCoordonne[bingoIndex].col[index] == 5) {
                            winningBingoIndex.push(bingoIndex)
                            bingoResult = {bingoIndex :bingoIndex, col: index}
                            console.log('--- --- --- --- BINGO !!!!! col => ', bingoResult)
                        
                        }
                    }
                }
    
            }
    
        }
        
    }
}


exports.day4 = day4;