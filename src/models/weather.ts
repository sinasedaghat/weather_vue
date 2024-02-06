import { type ExpandedWeather } from '@/types/weather'
import countries from '@/assets/json/countries.json'

class WeatherModels {
  private _data: any
  // contries = countries as {[K: string]: {[T: string]: string | null}}
  countriesMap: { [key: string]: { [subKey: string]: string | null } } = countries

  constructor(data: any) {
    this._data = data
  }

  expanded(): ExpandedWeather {
    // console.log('data from model', this._data)
    return {
      id: this._data.weather[0].id, // 
      city_id: this._data.id,
      timezone: this._data.timezone,
      name: this._data.name || '',
      country: this._data.sys.country,
      location:  `${this._data.name || ''}, ${this.countriesMap[this._data.sys.country.toLowerCase()].name_en || ''}`,
      main: this._data.weather[0].main,
      description: this._data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${this._data.weather[0].icon}@4x.png`, // this._data.weather[0].icon, // https://openweathermap.org/img/wn/this._data.weather[0].icon@4x.png
      temp: {
        temp: Math.round(this._data.main.temp),
        feels_like: Math.round(this._data.main.feels_like),
        temp_min: Math.round(this._data.main.temp_min),
        temp_max: Math.round(this._data.main.temp_max),
      },
      wind: {
        speed: this._data.wind.speed
      }
    }
  }

  shrunken() {}
}

export default WeatherModels