const descriptions = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Rain showers',
  82: 'Heavy showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm + hail',
  99: 'Thunderstorm + hail'
};

export function getDescription(code) {
  return descriptions[code] || 'Current conditions';
}

export default function WeatherCard({ location, weather }) {
  const current = weather.current;
  return (
    <section className="weather-card">
      <div>
        <p className="location">{location.name}, {location.country_code}</p>
        <p className="condition">{getDescription(current.weather_code)}</p>
        <div className="temperature">{Math.round(current.temperature_2m)}°</div>
        <p className="updated">Feels like {Math.round(current.apparent_temperature)}°</p>
      </div>

      <div className="details">
        <div><span>Humidity</span><strong>{current.relative_humidity_2m}%</strong></div>
        <div><span>Wind</span><strong>{Math.round(current.wind_speed_10m)} km/h</strong></div>
        <div><span>Timezone</span><strong>{weather.timezone}</strong></div>
        <div><span>Updated</span><strong>{current.time.replace('T', ' ')}</strong></div>
      </div>
    </section>
  );
}