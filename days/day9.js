const { debug } = require('console')
const fs = require('fs')

function getData(callBack, demo = true) {

    let fileToRead = './inputs/d9/input'
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
    getData((data) => {
        // todo format data in array//array int
        data.forEach((line, i, data) => {
            line = line.split('')
            line.forEach((value, j, current) => {
                current[j] = parseInt(value)}
                )
                data[i]= line
        })
        let sum = 0
        data.forEach((line, i, data) => {
            line.forEach((value, j, currenteline) => {
                let condition = 0 // must be equal to 4 
                //console.log('--- --- value ', value)
                // check left
                if(j==0){
                    condition ++
                    console.log('--- start of the currenteline')
                }else{
                    if(currenteline[j-1]>value){
                        condition ++
                    }
                }
                
                //check right
                if(typeof currenteline[j+1] == 'undefined'){
                    condition ++
                    console.log('--- end of the currenteline')
                }else{
                    if(currenteline[j+1] >value){ 
                        condition ++
                    }
                }

                // check up
                if(i == 0){
                    condition++
                }else{
                    if(value < data[i-1][j]){
                        condition ++
                    }
                }

                // check bottom
                if(typeof data[i+1] == 'undefined'){
                    condition++
                }else{
                    if(value < (data[i+1][j])){
                        condition ++
                    }
                }

                debug
                if(condition == 4){
                    console.log('--- ---- ----  conditions == 4 => ', value)
                    value +=1
                    sum += value
                }
            })
        })

        console.log('--- ---- ----  sum value => ', sum)

    }, demo)
}

exports.process = process