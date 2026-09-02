# REST APIs: Concepts, Integration and Industry Applications

## Student Assignment Report

**Title:** REST APIs – Concepts, Integration, JSON Handling and Weather Application  
**Application:** REST Weather Explorer  
**Public API used:** Open-Meteo REST APIs (geocoding + forecast)

---

## 1. Introduction

A REST (Representational State Transfer) API is a web API that exposes resources through standard HTTP methods. REST APIs are widely used because they provide a simple, interoperable way for web, mobile and server applications to communicate.

A client sends an HTTP request to an endpoint and the server returns a response, commonly as JSON. This separation allows frontend and backend systems to evolve independently.

---

## 2. Fundamental REST Concepts

### Resources and URLs
A REST service exposes resources through URLs. For example, a weather service can expose forecast data for a geographic coordinate.

### HTTP methods
- **GET** – retrieve information
- **POST** – create a resource
- **PUT** – replace/update a resource
- **PATCH** – partially update a resource
- **DELETE** – remove a resource

This assignment primarily uses **GET** because weather data is being retrieved.

### Stateless communication
Each request contains the information needed to process it. The server does not need to rely on previous client requests to understand the current request.

### JSON
JSON is a lightweight, human-readable data format commonly used in REST responses.

Example:
```json
{
  "latitude": 19.076,
  "longitude": 72.8777,
  "timezone": "Asia/Kolkata",
  "current": {
    "temperature_2m": 28.4,
    "relative_humidity_2m": 76
  }
}
```

### Status codes
Common HTTP status codes include:
- **200 OK** – request succeeded
- **201 Created** – resource created
- **400 Bad Request** – invalid request
- **401 Unauthorized** – authentication required/failed
- **404 Not Found** – resource not found
- **429 Too Many Requests** – rate limit exceeded
- **500 Internal Server Error** – server-side problem

---

## 3. Why REST APIs Matter

REST APIs are important in modern applications because they:
1. Connect frontend applications with backend services.
2. Allow the same data service to support web and mobile clients.
3. Encourage separation of concerns.
4. Make third-party service integration practical.
5. Support scalable, distributed application architectures.
6. Provide standardized HTTP-based communication.
7. Enable real-time or frequently refreshed information when appropriate.

---

## 4. GET Request and JSON Handling

A basic JavaScript GET request can be made using the Fetch API:

```javascript
async function getWeather(latitude, longitude) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}&current=temperature_2m,relative_humidity_2m`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();

  console.log(data.current.temperature_2m);
  console.log(data.current.relative_humidity_2m);

  return data;
}
```

The important sequence is:
1. Build the endpoint URL.
2. Send a GET request with `fetch()`.
3. Check `response.ok`.
4. Convert the response body to JSON with `response.json()`.
5. Read the required properties.
6. Handle errors with `try/catch`.

---

## 5. Selected Public API

The application uses **Open-Meteo**, a public weather service that provides forecast data without requiring an API key for normal non-commercial use.

Two REST endpoints are used:

### Geocoding
The user enters a city name. The geocoding endpoint returns location information including latitude and longitude.

### Forecast
The returned coordinates are sent to the forecast endpoint. The application requests:
- Current temperature
- Relative humidity
- Apparent temperature
- Weather code
- Wind speed
- Five days of maximum/minimum temperatures

The project keeps API logic in a separate service file rather than placing request code directly inside the UI components.

---

## 6. Application Workflow

```text
User enters city
       ↓
React SearchBar
       ↓
Geocoding GET request
       ↓
Latitude + Longitude
       ↓
Forecast GET request
       ↓
JSON response
       ↓
React state
       ↓
WeatherCard + Forecast components
       ↓
Visual weather dashboard
```

The application also displays a loading state while requests are running and an error state if a request fails.

---

## 7. React Integration

The main React state includes:
- `city` – current searched city
- `weather` – API response
- `location` – geocoded location
- `status` – loading/success/error
- `error` – user-friendly error message

`useEffect()` loads the default city's weather when the application starts.

The API service is separated into:

```text
src/
├── components/
│   ├── SearchBar.jsx
│   ├── WeatherCard.jsx
│   └── Forecast.jsx
├── services/
│   └── weatherApi.js
├── App.jsx
├── main.jsx
└── styles.css
```

This structure improves maintainability and makes the request logic reusable.

---

## 8. Error Handling

A robust API client should not assume that every request succeeds.

The project checks:

```javascript
if (!response.ok) {
  throw new Error(`Request failed (${response.status}).`);
}
```

The React application catches the error and displays a readable message with a retry option.

This is important because APIs can fail due to invalid input, network problems, rate limits, unavailable services, or server errors.

---

## 9. Visual Presentation

The application presents the API data through:
- Current location
- Current temperature
- Weather condition
- Feels-like temperature
- Humidity
- Wind speed
- Timezone
- Five-day forecast cards

Responsive CSS allows the dashboard to adapt to desktop and mobile screens.

---

## 10. Advanced API Techniques Demonstrated

### URL encoding
User input is encoded before being added to a URL:

```javascript
encodeURIComponent(city)
```

This prevents spaces and special characters in city names from breaking the request.

### Query parameters
The forecast request uses query parameters to specify coordinates, requested fields, timezone and forecast length.

### Separation of API and UI logic
API requests live in `weatherApi.js`, while presentation is handled by React components.

### Loading and error states
The UI explicitly represents asynchronous request states instead of leaving the user without feedback.

### Retry
When a request fails, the user can retry the operation.

---

## 11. Case Studies and Industry Applications

### E-commerce
Shopping applications use APIs for product catalogs, inventory, payment services, shipping tracking and recommendations. A frontend can request current product information without embedding the entire database into the application.

### Travel
Travel platforms integrate APIs for maps, flight information, hotel availability, currencies and weather. APIs make it possible to combine data from many specialized providers.

### Banking and fintech
Financial applications use APIs for account services, payments, identity verification and transaction processing. Strong authentication and authorization are especially important in this environment.

### Social platforms
Social applications expose APIs for profiles, posts, media and integrations. APIs allow approved third-party applications to consume platform functionality.

### Weather and IoT
Weather APIs provide environmental information to dashboards, logistics systems, agriculture applications, travel tools and IoT systems. Devices and applications can use the same service without implementing their own weather infrastructure.

---

## 12. Benefits and Challenges

### Benefits
- Reusable services
- Faster application development
- Separation between client and server
- Easy integration with specialized providers
- Standard HTTP communication
- Support for multiple client platforms
- Scalable architecture

### Challenges
- Network latency
- Rate limits
- API availability
- Authentication and authorization
- Version changes
- Unexpected response formats
- Security and sensitive-data handling

Good API integration therefore requires validation, error handling, documentation and careful dependency management.

---

## 13. Conclusion

REST APIs are a fundamental building block of modern software. They allow applications to exchange structured data through standard HTTP requests. In this assignment, a React application uses GET requests to retrieve location and weather information, parses JSON responses, handles loading and errors, and presents the returned data in a responsive visual dashboard.

The project demonstrates the complete API integration cycle: request, response, JSON parsing, state management, error handling and visual presentation.

## References
- Open-Meteo API documentation
- MDN Web Docs – Fetch API
- MDN Web Docs – HTTP response status codes
- REST architectural concepts
