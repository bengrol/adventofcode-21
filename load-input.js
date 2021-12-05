const fs = require('fs')

function getDataD3() {
    var dataInput = []
    fs.readFile('input-d3.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        console.log('data => ', data)
        //data = data.split('\n')
        // console.log(typeof data)    
        dataInput = data
    })
}

function getDataD4(cb) {
    fs.readFile('input-d4-1.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        cb(data.split(','))
    })
}

var fileContent = function(path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', function(error, contents) {
        if (error) reject(error);
        else resolve(contents);
      });
    });
  }

var getDataD4_1 = function(){
      return fileContent('input-d4.txt')
}
  


exports.getDataD3 = getDataD3;
exports.getDataD4 = getDataD4;
exports.getDataD4_1 = getDataD4_1
;
exports.fileContent = fileContent;