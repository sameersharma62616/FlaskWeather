import { useState } from 'react'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  const getWeather = async () => {
    setError(null)
    setWeather(null)
    if (!city) {
      setError('Please enter a city')
      return
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/weather?city=${city}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
      } else {
        setWeather(data)
      }
    } catch (err) {
      setError('Failed to fetch weather info')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Weather App</h2>
        
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        
        <button
          onClick={getWeather}
          className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-md shadow hover:bg-blue-700 transition"
        >
          Get Weather
        </button>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}

        {weather && (
          <div className="mt-8 bg-gray-50 rounded-lg p-6 text-center shadow">
            <h3 className="text-xl font-semibold text-gray-700">{weather.city}</h3>
            <p className="text-5xl font-bold text-blue-600 my-2">{weather.temperature}°C</p>
            <p className="capitalize text-gray-600 mb-4">{weather.description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              className="mx-auto mb-4"
            />
            <p className="font-semibold text-gray-700">Humidity: <span className="text-blue-600">{weather.humidity}%</span></p>
            <p className="font-semibold text-gray-700">Wind Speed: <span className="text-blue-600">{weather.wind_speed} m/s</span></p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App