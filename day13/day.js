const { debug } = require('console')
const fs = require('fs')
const devMode = false
const dayNum = 13
const fileName = devMode ? "input-demo.txt" : "input.txt" 
const path = "./day"+dayNum+"/inputs/"+fileName

const read = fs.readFileSync(path);
const input = read.toString().split('\n\n')

const process = function () {

    // x => colonne
    // y => ligne
    const dotsInstructions = input[0].split('\n')
    dotsInstructions.forEach((e, i, tab)=>{
        const ligne = e.split(',')
        tab[i] = {x:parseInt(ligne[0]), y:parseInt(ligne[1])}
    })
    let foldInstructions = input[1].split('\n')
    foldInstructions.forEach((e, i, tab)=>{
        tab[i] = e.replace('fold along ','').split('=')
        
    })
    

    foldInstructions.forEach(e=>{
        let index = findDotsIndex(e[0], e[1], dotsInstructions)
    })
    

let digitDisplayArray = []
let maxX = 0
let maxY = 0
dotsInstructions.forEach(e=>{
    if(e.x>maxX){
        maxX = e.x
    }
    if(e.y>maxY){
        maxY = e.y
    }
})

for (let index = 0; index <= maxY; index++) {
    let ligne = []
    for (let index = 0; index <= maxX; index++) {
        ligne.push('.')
    }
    digitDisplayArray.push(ligne)
}

dotsInstructions.forEach(e=>{
    digitDisplayArray[e.y][e.x] = 'X'

})

digitDisplayArray.forEach(ligne=>{
    console.log(ligne.join(''))
})

}


function findDotsIndex(axe, value, dotsInstructions){
    let index = []
    dotsInstructions.forEach((e,i, tab)=>{
        if((e[axe])>=value){
            index.push(i)
            let newValue = calculNewDots((e[axe]), value)
            e[axe] = newValue
            tab[i] = e
            
        }
    })
    return index
}


function calculNewDots(oldDots, folding){
    return folding - (oldDots -  folding)
}

function getDoubleIndexes(dotsInstructions){
    let indexToRemove = []
    dotsInstructions.forEach((e, index)=>{
        
        dotsInstructions.forEach((sub, i, tab)=>{
            
            if(i != index){
                if(e.x == sub.x && e.y == sub.y){
                    indexToRemove.push(i)
                }
            }
            
        })
    })

return indexToRemove
}
exports.process = process