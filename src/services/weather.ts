import http from "@/plugins/http"

class WeatherAPI {
  private _path = `${import.meta.env.VITE_WEATHER_BASE_URL}weather`

  getWeather(city: string) {
    return http.get(this._path, {
      params: {
        q: city,
        units: 'metric',
        APPID: import.meta.env.VITE_WEATHER_TOKEN
      }
    })
  }
}

export default new WeatherAPI()