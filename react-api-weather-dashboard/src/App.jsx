import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import { geocodeCity, getWeather } from './services/weatherApi';

const DEFAULT_CITY = 'Mumbai';

export default function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  async function loadWeather(cityName) {
    setStatus('loading');
    setError('');

    try {
      const place = await geocodeCity(cityName);
      if (!place) throw new Error('City not found. Try another city name.');

      const data = await getWeather(place.latitude, place.longitude);
      setLocation(place);
      setWeather(data);
      setCity(place.name);
      setStatus('success');
    } catch (err) {
      setWeather(null);
      setStatus('error');
      setError(err.message || 'Unable to fetch weather data.');
    }
  }

  useEffect(() => {
    loadWeather(DEFAULT_CITY);
  }, []);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand"><span>☁</span> WeatherNow</div>
        <div className="api-label">React API Integration</div>
      </header>

      <main className="container">
        <section className="hero">
          <p className="eyebrow">Live public API demo</p>
          <h1>Weather at a glance.</h1>
          <p>Search for a city to fetch current conditions and a short forecast from a public weather API.</p>
        </section>

        <SearchBar onSearch={loadWeather} loading={status === 'loading'} />

        {status === 'loading' && (
          <div className="message"><span className="spinner" /> Fetching fresh weather data…</div>
        )}

        {status === 'error' && (
          <div className="message error">
            <strong>Something went wrong.</strong>
            <span>{error}</span>
            <button onClick={() => loadWeather(city)}>Try again</button>
          </div>
        )}

        {status === 'success' && weather && location && (
          <>
            <WeatherCard location={location} weather={weather} />
            <Forecast weather={weather} />
            <section className="api-notes">
              <h2>API integration used</h2>
              <div className="notes-grid">
                <div><strong>1. Search</strong><span>City name is sent to the geocoding endpoint.</span></div>
                <div><strong>2. Fetch</strong><span>Coordinates are used to request weather data.</span></div>
                <div><strong>3. Handle</strong><span>Loading and errors are managed with React state.</span></div>
                <div><strong>4. Display</strong><span>API response data is rendered through reusable components.</span></div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer>Built with React • Fetch API • Open-Meteo</footer>
    </div>
  );
}