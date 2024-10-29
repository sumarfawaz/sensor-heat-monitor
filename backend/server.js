const SerialPort = require('serialport').SerialPort;
const sp = new SerialPort({path: "COM3", baudRate: 115200});

const sent_data = '\x45';

sp.on("open", function() {
    console.log("port has opened");

    sp.write(sent_data, function(err){
        if(err){
            return console.log('Error on write', err.message);
        }
        console.log('Port.write: ', sent_data);
    });
});

sp.on('data', function(data){
    // decoding uint8Array to string
    var enc = new TextDecoder();
    var arr = new Uint8Array(data);
    ready = enc.decode(arr)

    console.log('Data received: ', ready);
});

// Read data that is available but keep the stream from entering "flowing mode"
sp.on('readable', function () {
    console.log('Data2:', sp.read());
});