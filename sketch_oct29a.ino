#include <dht.h>  // Include the DHT library

dht DHT;  // Create an instance of the dht class

#define DHT11_PIN 5  // Define the pin where the DHT11 is connected

void setup()
{
  Serial.begin(115200);  // Start the serial communication at 115200 baud rate
  Serial.println("DHT TEST PROGRAM ");
  Serial.print("LIBRARY VERSION: ");
  Serial.println(DHT_LIB_VERSION);  // Print the version of the library
  Serial.println();
  Serial.println("Type,\tStatus,\tHumidity (%),\tTemperature (C)");  // Header for the output
}

void loop()
{
  // Read data from the DHT11 sensor
  Serial.print("DHT11, \t");
  int chk = DHT.read11(DHT11_PIN);  // Read data from the sensor
  switch (chk)
  {
    case DHTLIB_OK:  
      Serial.print("OK,\t");  // No error, data was read correctly
      break;
    case DHTLIB_ERROR_CHECKSUM: 
      Serial.print("Checksum error,\t");  // Error in reading data, checksum mismatch
      break;
    case DHTLIB_ERROR_TIMEOUT: 
      Serial.print("Time out error,\t");  // Sensor did not respond in time
      break;
    case DHTLIB_ERROR_CONNECT:
      Serial.print("Connect error,\t");  // Error connecting to the sensor
      break;
    case DHTLIB_ERROR_ACK_L:
      Serial.print("Ack Low error,\t");  // Low ACK error
      break;
    case DHTLIB_ERROR_ACK_H:
      Serial.print("Ack High error,\t");  // High ACK error
      break;
    default: 
      Serial.print("Unknown error,\t");  // Any other unknown error
      break;
  }
  
  // Display humidity and temperature data
  Serial.print(DHT.humidity, 1);  // Print humidity with 1 decimal place
  Serial.print(",\t");
  Serial.println(DHT.temperature, 1);  // Print temperature with 1 decimal place

  delay(2000);  // Wait for 2 seconds before reading again
}
