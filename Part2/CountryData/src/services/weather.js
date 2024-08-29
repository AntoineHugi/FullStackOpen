import axios from 'axios'

const apiKey = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall'

const getWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default { getWeather }