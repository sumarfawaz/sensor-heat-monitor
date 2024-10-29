import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file for styling

function App() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    // Fetch temperature from the backend
    axios.get('http://localhost:5000/api/temperature')
      .then((response) => {
        const rawData = response.data.temperature;
        // Split the response by commas and tabs to extract the values
        const dataParts = rawData.split(',');
        const tempValue = parseFloat(dataParts[2].trim());  // Extract temperature
        const humidityValue = parseFloat(dataParts[1].trim());  // Extract humidity
        setTemperature(tempValue);
        setHumidity(humidityValue);
      })
      .catch((error) => {
        console.error('Error fetching temperature data:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Room Temperature Monitoring</h1>
      <div 
        className="temperature" 
      >
        <p style={{ color: temperature > 30 ? 'red' : 'green' }}>
        {temperature !== null ? `Temperature: ${temperature}°C` : 'Loading...'}
        </p>  

        <p style={{ color:'red', display: temperature > 30 ? 'inline' : 'none' }} >
          <b>Please turn on the AC to control heat and humidity in the room.</b>
        </p>
      </div>

      <p className="humidity"
        style={{ color: humidity > 85 ? 'blue' : 'green' }}
      >
        {humidity !== null ? `Humidity: ${humidity}%` : ''}
      </p>
    </div>
  );
}

export default App;
