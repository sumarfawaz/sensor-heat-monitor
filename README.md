
# Temperature & Humidity Monitoring System
 A PAT project to monitor room temperature and humidity. 


## Problem

Due to the high heat and the computers that are running in my room, it was so hard to manage the heat. One of the machines is a NAS (Network Access Storage), where my laptops access the server and get the required files. This is how I am affectively managing my files. Which is almost like having an on premise cloud storage for backing up files. The server I am using is RAID enabled which makes it a perfect match for a purpose like this. So, this produced a lot of heat in my room and I wanted to monitor the temperature in my room to automate the process of turning on the AC. 


## Solution

### Real-time Temperature and Humidity Reading

I have used Arduino UNO and dht11 sensor to read the Temperature and the humidity. You can find the Arduino Sketch (Code) uploaded in the repository. The Arduino sends real-time data to the Node.Js Server as an API and that is being called by the React.JS front-end that displays the temperature and the humidity. If the temperature is more than 32* Celcius, the message will be displayed on the React.JS front-end to turn on the AC. This will later automate the process of turning on the AC.
## Documentation

The Arduino is connected to the port COM3 in my case, which you can find after you have connected the Arduino UNO to the computer. You can check this from the device manager or the Arduino IDE tools section which specifies the port. If you haven't installed the necessary drivers for Arduino, your computer won't be able to detect the Arduino UNO. Please make sure the necessary drivers are installed if your Arduino UNO requires drivers to be installed to work. 

### Arduino UNO and DHT11 Sensor Wiring
The Anode (+) of the Sensor should be connected to a 5V pin on the Arduino UNO and the Cathode (-) should be connected to a GND pin on the board. Finally, connect the output of the sensor to Digital pin 5. This can be changed based on the digital pin that you are comfortable with. If you are connecting it to a seperate pin, make sure to change this in the sketch of the Arduino. 

```C++
#define DHT11_PIN add_the_pin_number_here  // Define the pin where the DHT11 is connected

```
After you are done with wiring, please make sure to follow these instructions to import the dht library. 

1. Download https://github.com/RobTillaart/Arduino/archive/master.zip

2. Copy the Arduino-master/libraries/DHTlib subfolder of the downloaded file to the libraries subfolder of your sketchbook folder. You can find the location of your sketchbook folder at File > Preferences > Sketchbook location in the Arduino IDE.

After you have completed the above importing of the library. We are almost set to upload the sketch to the Arduino. Click on Verify in Arduino IDE to see if there are any issues. If that is successful, upload the sketch to the Arduino and you will be set to work on the Node.js backend. 

You can verify if the Arduino is really reading the temperature real-time by opening the serial monitor and setting the baud to 115200 from the options.

Once, you get the output from the serial monitor, you can close the serial monitor and navigate to backend folder. Clone the project into a directory that you are comfortable with, then you can open a terminal from VS code or any Editor that you are using. If you don't have node.js installed, please install it first from the official Node.js website.

Please make sure to change this line of code in the /backend/server.js. 

```javascript
// Initialize serial port connection
const sp = new SerialPort({ path: "COM3", baudRate: 115200 });

```

```terminal
cd sensor-heat-monitor

cd backend

npm install 

npm start OR npm server.js
```

If all the instructions are followed without an error, you will be able to see the results on the console. you can also visit http://localhost:5000/api/temperature. We have used Express.JS to create the API. 

If everything works then you are just one step away from getting the results on the front-end. Open a new terminal in the same directory and type in these commands to navigate to the client folder and setup the react.js application. 

```terminal
cd sensor-heat-monitor

cd client

npm install 

npm start 
```

If your application deploys successfully http://localhost:3000/ at this address. You will be able to see the temperature and the humidity real-time. Feel free to customize the threshold to meet your requirements. 


