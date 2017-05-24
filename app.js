var noble = require('noble');
var convert = require('color-convert');
var argv = require('yargs').argv;

var bluetoothHelper = require('./bluetooth.js');

var peripheral;


noble.on('stateChange', function (state) {
    if (state === 'poweredOn') {
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', function (peripheral) {


    if (peripheral.advertisement.localName === 'PLAYBULB COMET') {
        console.log('Found the Play Bulb at ' + peripheral.id);

        var advert = peripheral.advertisement;


        connectToPeripheral(peripheral);

    }
});

function connectToPeripheral(peripheral) {

    peripheral.on('disconnect', function() {
        process.exit(0);
    })

    peripheral.connect(function (error) {
        peripheral.discoverServices(['ff07'], function (error, services) {
            console.log(services);

            var colorService = services[0];
            console.log('Discovered Service');

            colorService.discoverCharacteristics(['fffc'], function (error, characteristics) {
                console.log(characteristics);
                var colorCharacteristic = characteristics[0];

                console.log('Discovered Characteristic');



                changeColor(colorCharacteristic, '00', argv.color);


            });

        });


    });

    console.log('About to disconnect');

    peripheral.disconnect();

    console.log('Disconnected');


}


function changeColor(colorCharacteristic, intensity, newColor) {


    var newColorHex = convert.keyword.hex(newColor);

    var data = new Buffer(intensity + newColorHex, "hex");




    colorCharacteristic.write(data, true, function (err) {

        if (!err) {
            console.log('Changed color to: ' + newColor);



            //process.exit(0)
        } else {
            console.error(err);
           // process.exit(1);
        }


    });


}
