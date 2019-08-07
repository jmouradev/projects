/* eslint-disable no-console */

const fs = require('fs');

let imagePath = '/../images/';

exports.readImage = function(dadosIn, callback) {
    const filename = __dirname + imagePath + dadosIn.dados.filename;
    //  console.log("dadosIn:", dadosIn)
    //  console.log("directory:", __dirname)
    console.log('filename:', filename);

    fs.readFile(filename, function read(err, buffer) {
        if (err) {
            console.log('Error(2):', err);
            return callback({
                err: {
                    status: 550,
                    message: 'Ocorreu um erro no sistema, tente mais tarde!'
                },
                dados: null
            });
        } else {
            let data = buffer.toString('utf8', 0, buffer.length);
            return callback({
                err: null,
                dados: { width: 858, height: 480, image: data }
            });
        }
    });
};

exports.writeImage = function(dadosIn, callback) {
    const filename = __dirname + imagePath + dadosIn.dados.filename;
    //  console.log("dadosIn:", dadosIn)
    //  console.log("directory:", __dirname)
    console.log('filename:', filename);

    fs.writeFile(filename, dadosIn.dados.image, function(err) {
        if (err) {
            console.log('Error(2):', err);
            return callback({
                err: {
                    status: 550,
                    message: 'Ocorreu um erro no sistema, tente mais tarde!'
                },
                dados: null
            });
        } else {
            return callback({ err: null, dados: null });
        }
    });
};
