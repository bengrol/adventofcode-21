const { debug } = require('console')
const fs = require('fs')
const devMode = true
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
        tab[i] = {x:ligne[0], y:ligne[1]}
    })
    let foldInstructions = input[1].split('\n')
    foldInstructions.forEach((e, i, tab)=>{
        tab[i] = e.replace('fold along ','').split('=')
        debug
    })

    
 


// calculer les dimensions x max & y max  ??
// calculer les correspondances pour chaque foldsInstruction 
// ex : si fold y=7
// modifier tous les instructions avec un y > 7
// 8,10 sera egale à 8,4  ==> (10-7)-7
// 1,10 sera egale à 1,4   ==> (10-7)-7
// 2,14 sera egale à  ==> (14-7)-7


debug



    // Object.keys(instructions).forEach(key => {
    //     console.log(key, instructions[key]);
    //     const regExpp = new RegExp(key, 'ig')
    //     pattern = pattern.replaceAll(regExpp, instructions[key])
    //     console.log('--- --- pattern ', pattern)
    // });
    
    
    // console.log('--- --- pattern ', pattern)
    console.log('--- input => ', input[1])

}


exports.process = process