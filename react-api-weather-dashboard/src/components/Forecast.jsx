import { getDescription } from './WeatherCard';

function dayName(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short' });
}

export default function Forecast({ weather }) {
  const { daily } = weather;

  return (
    <section className="forecast">
      <div className="section-title">
        <div>
          <h2>5-day forecast</h2>
          <p>Data returned by the daily forecast endpoint.</p>
        </div>
      </div>

      <div className="forecast-grid">
        {daily.time.map((date, index) => (
          <article className="day" key={date}>
            <strong>{index === 0 ? 'Today' : dayName(date)}</strong>
            <span className="day-icon">{daily.weather_code[index] === 0 ? '☀' : '☁'}</span>
            <span className="day-condition">{getDescription(daily.weather_code[index])}</span>
            <div className="temps">
              <b>{Math.round(daily.temperature_2m_max[index])}°</b>
              <span>{Math.round(daily.temperature_2m_min[index])}°</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}