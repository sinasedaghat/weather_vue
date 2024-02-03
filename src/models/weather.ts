import { type ExpandedWeather } from '@/types/weather'

class WeatherModels {
  private _data: any

  constructor(data: any) {
    this._data = data
  }

  expanded(): ExpandedWeather {
    console.log('data from model', this._data)
    return {
      id: this._data.weather[0].id,
      city_id: this._data.id,
      timezone: this._data.timezone,
      name: this._data.name || '',
      country: this._data.sys.country || '',
      main: this._data.weather[0].main,
      description: this._data.weather[0].description,
      icon: this._data.weather[0].icon,
      temp: {
        temp: this._data.main.temp,
        feels_like: this._data.main.feels_like,
        temp_min: this._data.main.temp_min,
        temp_max: this._data.main.temp_max,
      },
      wind: {
        speed: this._data.wind.speed
      }
    }
  }

  shrunken() {}
}

export default WeatherModels