const loadInput = require('./load-input.js')
//const indexD4 = require('./index-d3')

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
        console.log('--- --- bingos  => ')
        // console.log(bingos)
        var markedValuesCoordonne = []
        bingos.forEach(()=>{
            markedValuesCoordonne.push({ 'line': [0, 0, 0, 0, 0], 'col': [0, 0, 0, 0, 0] })
        })
        for (let index = 0; index < data.length; index++) {
            const bingoResult = findInBingos(data[index], bingos, markedValuesCoordonne)
            if(bingoResult){
                console.log('--- --- Bingo result => ', bingoResult)
                const winningBingo = bingos[bingoResult.bingoIndex]
                if('line' in bingoResult){
                    var sum =0
                    winningBingo[bingoResult.line].forEach(e => sum += parseInt(e))
                    console.log('--- --- sum bingo ', sum)
                }
                if('col' in bingoResult){
                    var sum =0
                    winningBingo.forEach(e => sum += parseInt(e[bingoResult.col]))
                    console.log('--- --- sum bingo ', sum)
                }
                break
            }

        }
    })
})

function findInBingos(valueToFind, bingos, markedValuesCoordonne) {
    var bingoResult = {}
    var bingoStop = false
    for (let bingoIndex = 0; bingoIndex < bingos.length; bingoIndex++) {
        const bingo = bingos[bingoIndex]
        for (let lineIndex = 0; lineIndex < bingo.length; lineIndex++) {
            const line = bingo[lineIndex]
            for (let index = 0; index < line.length; index++) {
                if (parseInt(line[index]) == valueToFind) {
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