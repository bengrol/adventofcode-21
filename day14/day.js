const { debug } = require('console')
const fs = require('fs')
const devMode = true
const dayNum = 14
const fileName = devMode ? "input-demo.txt" : "input.txt" 
const path = "./day"+dayNum+"/inputs/"+fileName

const read = fs.readFileSync(path);
const input = read.toString().split('\n\n')


const process = function () {

    let pattern = input[0]
    const instructions = {}
    input[1].split('\n').forEach((e)=>{
        const key = e.split(' -> ')[0]
        instructions[key] = key.charAt(0) + e.split(' -> ')[1] + key.charAt(1)
        
        
    })
    console.log('--- --- pattern ', pattern)
    Object.keys(instructions).forEach(key => {
        console.log(key, instructions[key]);
        const regExpp = new RegExp(key, 'ig')
        pattern = pattern.replaceAll(regExpp, instructions[key])
        console.log('--- --- pattern ', pattern)
    });
    
    
    // console.log('--- --- pattern ', pattern)
    // console.log('--- instructions => ', instructions)

}


exports.process = process