const { SerialPort } = require('serialport');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize serial port connection
const sp = new SerialPort({ path: "COM3", baudRate: 115200 });

let latestTemperatureData = "";  // Store the most recent temperature data

app.use(cors());
app.use(express.json());

const sent_data = '\x45';

sp.on("open", function () {
    console.log("Port has opened");

    sp.write(sent_data, function (err) {
        if (err) {
            return console.log('Error on write:', err.message);
        }
        console.log('Port.write:', sent_data);
    });
});

// Read data from the serial port and store it in `latestTemperatureData`
sp.on('data', function (data) {
    // decoding uint8Array to string
    let enc = new TextDecoder();
    let arr = new Uint8Array(data);
    latestTemperatureData = enc.decode(arr);  // Update the latest data
    console.log('Data received:', latestTemperatureData);
});

// Read data that is available but keep the stream from entering "flowing mode"
sp.on('readable', function () {
    console.log('Data2:', sp.read());
});

// Handle API request to return the latest temperature data
app.get('/api/temperature', (req, res) => {
    if (latestTemperatureData) {
        res.json({ temperature: latestTemperatureData });
    } else {
        res.status(404).json({ error: "No temperature data available yet" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
