const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON data

// API route example
app.get('/api/temperature', (req, res) => {
  res.json({ temperature: 24.5 }); // Example temperature data
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
