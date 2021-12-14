const { debug } = require('console')
const fs = require('fs')
var counter = 0
var correspondanceTable = {}

function getData(callBack, demo = true) {

    let fileToRead = './day12/inputs/input'
    fileToRead += demo ? '-demo.txt' : '.txt'

    fs.readFile(fileToRead, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        data = data.split('\n')

        // converte to int
        // data.forEach((element, i, data) => {
        //     data[i] = element.split('').map(function (x) {
        //         return parseInt(x, 10);
        //     });
        // });
        callBack(data)
    })
}
const process = function () {

    const demo = false  // false for prod inputs
    getData((data) => {

        let sumResult = 0
        data.forEach(line => {
            line = line.split('-')
            line.forEach((e, i, line) => {
                if (!(e in correspondanceTable)) {
                    correspondanceTable[e] = []
                }
                if (i == 0 && line[1] != 'start') {
                    correspondanceTable[e].push(line[1])
                }
                if (i == 1 && line[0] != 'start') {
                    correspondanceTable[e].push(line[0])
                }
            })

        });

        delete correspondanceTable.end

        // Object.keys(correspondanceTable).forEach(key => {
        //     console.log(key, correspondanceTable[key]);
        //   });

        let paths = []
        paths = getAvailablesPaths('start', correspondanceTable)
        builPathRecursively('start', 'start', 1)
        
        console.log('##### result => ', counter)
    

    }, demo)

}


function builPathRecursively(node, pathParcour, niveau = 0) {
    const paths = correspondanceTable[node]
    
    paths.forEach(p => {

        const lowerCase = pathParcour.split(' - ').filter((el) => el.toLowerCase() == el);
        let hasDouble = false
        lowerCase.forEach(e=>{
            if (lowerCase.filter((n) => n == e).length > 1) {
                hasDouble = true;
              }
        })

        const reg = new RegExp('- '+p, "g")
        let nodeCanBeUsed = false
        if(p !== 'match' && p !== 'end'){
           
            if(hasDouble){
                 // verif qu'il y a moins de 1 occurences du node
                nodeCanBeUsed = ((pathParcour.match(reg) || []).length)<1
                
            }else{
                // verif qu'il y a moins de 2 occurences du node
                nodeCanBeUsed = ((pathParcour.match(reg) || []).length)<2
            }
            
            debug
        }else{
            nodeCanBeUsed = ((pathParcour.match(reg) || []).length)=1
        }        
        if (nodeCanBeUsed || p == p.toUpperCase()) {
            let newpathParcour = pathParcour
            newpathParcour += ' - ' + p
            if (p == 'end') {
                counter++
               // console.log('--- --- --- --- ', newpathParcour)
            } else {
               
                builPathRecursively(p, newpathParcour, niveau++)
            }
        }
        debug
    })
}

function getAvailablesPaths(entre) {
    
    return correspondanceTable[entre]
}
exports.process = process