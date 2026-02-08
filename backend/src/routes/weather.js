import { Router } from 'express';
import * as weatherService from '../services/weatherService.js';

const router = Router();

router.get('/selected', async (req, res) => {
  try {
    const { name, country, lat, lon } = req.query;
    if (!name || !country || lat == null || lon == null) {
      return res.status(400).json({ error: 'Missing name, country, lat, or lon' });
    }
    const data = await weatherService.getSelectedCityWeather(name, country, parseFloat(lat), parseFloat(lon));
    res.json(data);
  } catch (err) {
    console.error('[GET /weather/selected]', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/top-cities', async (req, res) => {
  try {
    const { excludeCity, excludeCountry } = req.query;
    const data = await weatherService.getTopCitiesWeather(excludeCity || null, excludeCountry || null);
    res.json(data);
  } catch (err) {
    console.error('[GET /weather/top-cities]', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { name, country, lat, lon } = req.query;
    if (!name || !country || lat == null || lon == null) {
      return res.status(400).json({ error: 'Missing name, country, lat, or lon' });
    }
    const data = await weatherService.getWeather(name, country, parseFloat(lat), parseFloat(lon));
    res.json(data);
  } catch (err) {
    console.error('[GET /weather]', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { city, country, latitude, longitude } = req.body;
    if (!city || !country || latitude == null || longitude == null) {
      return res.status(400).json({ error: 'Missing city, country, latitude, or longitude' });
    }
    console.log(`[${new Date().toISOString()}] City selected: ${city}, ${country}`);
    const data = await weatherService.postWeather(city, country, parseFloat(latitude), parseFloat(longitude));
    res.json(data);
  } catch (err) {
    console.error('[POST /weather]', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
