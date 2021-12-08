//const { debug } = require('console')
//const fs = require('fs')

var process = function () {
   //const fishesInput = [4,1,1,4,1,1,1,1,1,1,1,1,3,4,1,1,1,3,1,3,1,1,1,1,1,1,1,1,1,3,1,3,1,1,1,5,1,2,1,1,5,3,4,2,1,1,4,1,1,5,1,1,5,5,1,1,5,2,1,4,1,2,1,4,5,4,1,1,1,1,3,1,1,1,4,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,2,1,1,1,1,1,1,1,2,4,4,1,1,3,1,3,2,4,3,1,1,1,1,1,2,1,1,1,1,2,5,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,4,1,5,1,3,1,1,1,1,1,5,1,1,1,3,1,2,1,2,1,3,4,5,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,3,1,1,3,1,1,4,1,1,1,1,1,2,1,1,1,1,3,2,1,1,1,4,2,1,1,1,4,1,1,2,3,1,4,1,5,1,1,1,2,1,5,3,3,3,1,5,3,1,1,1,1,1,1,1,1,4,5,3,1,1,5,1,1,1,4,1,1,5,1,2,3,4,2,1,5,2,1,2,5,1,1,1,1,4,1,2,1,1,1,2,5,1,1,5,1,1,1,3,2,4,1,3,1,1,2,1,5,1,3,4,4,2,2,1,1,1,1,5,1,5,2]

    const fishesInput = [3,4,3,1,2]
    var sumOffish = 0

    const bufferPattern = {
        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0
    }

    var buffer = {...bufferPattern}
    fishesInput.forEach((e) => {
        buffer[e]++
    })

   for (let index = 1; index <= 256; index++) {
    var newBuffer = {...bufferPattern}
        var addFish = false
        for (let j = 0; j <= 8; j++) {
             // newBuffer = {...bufferPattern}
            if(j==0 ){
                if(buffer[j] == 0){
                    newBuffer[8] = 0
                }else{
                    addFish = buffer[j]
                }                
            }else{
                newBuffer[j-1] += buffer[j]
            }
 
       }
       if(addFish){
        newBuffer[6] +=addFish
        newBuffer[8] +=addFish
        addFish =false
       }
       //console.log('--- newBuffer ', newBuffer)
       buffer = newBuffer
   } 

     //console.log('--- buffer ', buffer)
     for (let index = 0; index <= 8; index++) {
        sumOffish += buffer[index];
         
     }

     console.log('--- sum of fish ', sumOffish)

}
exports.process = process