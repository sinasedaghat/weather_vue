import http from '@/plugins/http'
import service from '@/services/abstract_service'
import { toValue, type Ref } from 'vue'

class WeatherAPI extends service {
  private _path = `${import.meta.env.VITE_WEATHER_BASE_URL}weather`

  getWeather(city: Ref<string> | string) {
    return http.get(this._path, {
      params: {
        q: toValue(city),
        units: 'metric',
        APPID: import.meta.env.VITE_WEATHER_TOKEN
      }
    })
  }
}

export default new WeatherAPI()