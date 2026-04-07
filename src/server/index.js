const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const API_KEY = 'WDUU0ZHZY2DFMRRCVS4QXVGJ3M5TLLFSL2KXHGE3JMWQVT2L';

app.use(cors());

app.get('/api/places', async (req, res) => {
  const { query, near, limit } = req.query;
  if (!query || !near) {
    return res.status(400).json({ error: "Both 'query' and 'near' parameters are required." });
  }
  try {
    const response = await axios.get('https://places-api.foursquare.com/places/search', {
      params: {
        query,
        near,
        limit: limit ? Number(limit) : 10
      },
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
        'X-Places-Api-Version': '2025-06-17'
      }
    });
    res.json(response.data);
  } catch (err) {
    // Log detailed error information
    if (err.response) {
      console.error('Foursquare API error:', err.response.status, err.response.data);
      res.status(err.response.status).json({ error: err.response.data });
    } else {
      console.error('Server error:', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));