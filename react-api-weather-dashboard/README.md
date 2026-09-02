# WeatherNow — React API Integration Assignment

A functional React application demonstrating public API integration by fetching live weather data.

## API
This project uses the public Open-Meteo APIs:
- Geocoding API: converts a city name into latitude/longitude.
- Forecast API: returns current weather and a 5-day forecast.

## What this assignment demonstrates
1. Sending requests with the browser Fetch API.
2. Handling HTTP errors with `response.ok`.
3. Parsing JSON responses.
4. Managing loading, success and error states with React `useState`.
5. Loading initial data with `useEffect`.
6. Passing API data into reusable components.
7. Rendering current conditions and forecast data.
8. URL encoding user input with `encodeURIComponent`.
9. Responsive UI for desktop and mobile.
10. Separation of API logic into `src/services/weatherApi.js`.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Suggested GitHub repository
`react-api-weather-dashboard`
