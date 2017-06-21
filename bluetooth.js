/**
 * Created by jacob on 4/22/17.
 */

//Functions for connecting, changing and changing colors of bluetooth device.



    var noble = require('noble');
//Public Functions
var bluetoothHelper = {

    changeSolidColor: function (newColor) {


    },

    killLights: function () {
        return null;

    },

    connectToPeripheral: function (peripheral) {



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


}


//Variables
bluetoothHelper.peripheral;


module.exports = bluetoothHelper;
