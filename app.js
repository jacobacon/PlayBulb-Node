var noble = require('noble');
var convert = require('color-convert');


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

        var localName = advert.localName;
        var serviceData = advert.serviceData;


        connectToPeripheral(peripheral);

    }

    function connectToPeripheral(peripheral) {

        peripheral.connect(function (error) {
            peripheral.discoverServices(['ff07'], function (error, services) {
                console.log(services);

                var colorService = services[0];
                console.log('Discovered Service');

                colorService.discoverCharacteristics(['fffc'], function (error, characteristics) {
                    console.log(characteristics);
                    var colorCharacteristic = characteristics[0];

                    console.log('Discovered Characteristic');


                    var data = new Buffer("090000ff", "hex");


                    colorCharacteristic.write(data, true, function (err) {

                        if (!err) {
                            console.log('Changed color to: ');
                        } else {
                            console.error(err);
                        }


                        //changeColor(colorCharacteristic, 'green');


                    });

                });


            });


        });


    }


});


function changeColor(colorCharacteristic, newColor) {


}

function killLights(colorCharacter) {

    //Sets the color to 'black' which is off
    var data = new Buffer("00000000", "hex");
    colorCharacter.write(data, true, function(err){

    });

}
