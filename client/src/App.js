import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [temperature, setTemperature] = useState(null);
  
  useEffect(() => {
    // Fetch temperature from the backend
    axios.get('http://localhost:5000/api/temperature')
      .then((response) => {
        setTemperature(response.data.temperature);
      })
      .catch((error) => {
        console.error('Error fetching temperature data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Room Temperature Monitoring</h1>
      <p>Current Temperature: {temperature ? `${temperature}°C` : 'Loading...'}</p>
    </div>
  );
}

export default App;