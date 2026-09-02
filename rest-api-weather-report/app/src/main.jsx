import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const geoUrl = city =>
  `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

const weatherUrl = (lat, lon) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
  `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;

const weatherText = {
  0:'Clear sky', 1:'Mainly clear', 2:'Partly cloudy', 3:'Overcast',
  45:'Fog', 48:'Rime fog', 51:'Light drizzle', 53:'Drizzle', 55:'Heavy drizzle',
  61:'Light rain', 63:'Rain', 65:'Heavy rain', 71:'Light snow', 73:'Snow',
  75:'Heavy snow', 80:'Rain showers', 81:'Rain showers', 82:'Heavy showers',
  95:'Thunderstorm', 96:'Thunderstorm + hail', 99:'Thunderstorm + hail'
};

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP request failed with status ${response.status}.`);
  return response.json();
}

async function searchWeather(city) {
  const geo = await fetchJson(geoUrl(city));
  const place = geo.results?.[0];
  if (!place) throw new Error('City not found. Please try another city.');
  const weather = await fetchJson(weatherUrl(place.latitude, place.longitude));
  return { place, weather };
}

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [state, setState] = useState('loading');
  const [error, setError] = useState('');

  async function load(city) {
    setState('loading');
    setError('');
    try {
      setResult(await searchWeather(city));
      setState('success');
    } catch (err) {
      setState('error');
      setError(err.message);
    }
  }

  useEffect(() => { load('Mumbai'); }, []);

  const current = result?.weather.current;
  const daily = result?.weather.daily;

  return (
    <div className="page">
      <header>
        <strong>REST Weather Explorer</strong>
        <span>GET • JSON • React</span>
      </header>

      <main>
        <div className="intro">
          <small>REST API CASE STUDY</small>
          <h1>Weather data,<br/><em>straight from an API.</em></h1>
          <p>Search a city and watch the React application retrieve, parse and visualize live forecast data.</p>
        </div>

        <form className="search" onSubmit={e => { e.preventDefault(); if (query.trim()) load(query.trim()); }}>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Enter a city, e.g. Delhi" />
          <button disabled={state === 'loading'}>{state === 'loading' ? 'Fetching…' : 'GET weather'}</button>
        </form>

        {state === 'loading' && <div className="notice">Fetching JSON response from the public REST API…</div>}
        {state === 'error' && <div className="notice error"><b>Request failed:</b> {error} <button onClick={() => load(query || 'Mumbai')}>Retry</button></div>}

        {state === 'success' && result && (
          <>
            <section className="current">
              <div>
                <small>{result.place.name}, {result.place.country_code}</small>
                <h2>{Math.round(current.temperature_2m)}°C</h2>
                <p>{weatherText[current.weather_code] || 'Current conditions'}</p>
              </div>
              <div className="metrics">
                <span>Feels like <b>{Math.round(current.apparent_temperature)}°C</b></span>
                <span>Humidity <b>{current.relative_humidity_2m}%</b></span>
                <span>Wind <b>{Math.round(current.wind_speed_10m)} km/h</b></span>
                <span>Timezone <b>{result.weather.timezone}</b></span>
              </div>
            </section>

            <section className="forecast">
              <div className="section-head"><h2>5-day response</h2><span>JSON → UI</span></div>
              <div className="cards">
                {daily.time.map((date, i) => (
                  <article key={date}>
                    <b>{i === 0 ? 'Today' : new Date(date + 'T12:00:00').toLocaleDateString(undefined, {weekday:'short'})}</b>
                    <div className="icon">{daily.weather_code[i] === 0 ? '☀' : '☁'}</div>
                    <small>{weatherText[daily.weather_code[i]] || 'Conditions'}</small>
                    <p><strong>{Math.round(daily.temperature_2m_max[i])}°</strong> / {Math.round(daily.temperature_2m_min[i])}°</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="concepts">
              <h2>What the app demonstrates</h2>
              <div>
                <article><b>01 — GET</b><p>HTTP GET requests retrieve geocoding and forecast resources.</p></article>
                <article><b>02 — JSON</b><p>Response bodies are parsed with <code>response.json()</code>.</p></article>
                <article><b>03 — HANDLE</b><p>Status checks, loading states, errors and retry logic protect the UI.</p></article>
                <article><b>04 — PRESENT</b><p>React state flows into reusable visual components.</p></article>
              </div>
            </section>
          </>
        )}
      </main>
      <footer>REST APIs • React • Fetch API • Open-Meteo</footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);