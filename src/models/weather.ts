import type { ExpandedWeather, ShrunkenWeather } from '@/types/weather'
import countries from '@/assets/json/countries.json'
import { Directions } from '@/data/wind_directions'

class WeatherModels {
  private _data?: any
  // contries = countries as {[K: string]: {[T: string]: string | null}}
  countriesMap: { [key: string]: { [subKey: string]: string | null } } = countries

  constructor(data?: any) {
    this._data = data
  }

  private _wind(speed: number, degree: number): string {
    const direction = Math.floor((+degree % 360) / 22.5)
    return `${speed.toFixed(1)}m/s ${Directions[direction]}`
  }

  expanded(): ExpandedWeather {
    // const sss = new Date(this._data.timezone * 1000)
    // console.log(this._data.timezone, 'data from model', sss)
    const expandedWeather: ExpandedWeather = {
      id: this._data.weather[0].id,
      city_id: this._data.id,
      shift_timezone: this._data.timezone,
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
    }
    if(this._data?.wind?.speed) expandedWeather['wind'] = this._wind(this._data.wind.speed, this._data.wind.deg ?? 0)
    if(this._data?.visibility) expandedWeather['visibility'] = `${(this._data.visibility / 1000).toFixed(1)}km`
    if(this._data?.main?.humidity) expandedWeather['humidity'] = `${this._data.main.humidity}%`
    if(this._data?.main?.pressure) expandedWeather['pressure'] = `${this._data.main.pressure}hPa`
    return expandedWeather
  }

  private _shrunkenResponse(): ShrunkenWeather {
    const shrunkenWeather: ShrunkenWeather = {
      id: this._data.weather[0].id,
      name: this._data.name || '',
      location:  `${this._data.name || ''}, ${this.countriesMap[this._data.sys.country.toLowerCase()].name_en || ''}`,
      main: this._data.weather[0].main,
      description: this._data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${this._data?.weather[0]?.icon}@4x.png`,
      temp: {
        temp: Math.round(this._data.main.temp),
        feels_like: Math.round(this._data.main.feels_like),
        temp_min: Math.round(this._data.main.temp_min),
        temp_max: Math.round(this._data.main.temp_max),
      },
    }
    return shrunkenWeather
  }

  private _shrunkenData(data: ExpandedWeather): ShrunkenWeather {
    const shrunkenWeather: ShrunkenWeather = {
      id: data.id,
      name: data.name,
      location:  data.location,
      main: data.main,
      description: data.description,
      icon: data.icon,
      temp: Object.assign(data.temp) // shallow copy is good because properties of temp are primitive
    }
    return shrunkenWeather
  }

  shrunkenAdapter(data?: ExpandedWeather): ShrunkenWeather {
    return data ? this._shrunkenData(data) : this._shrunkenResponse()
    // if(data) return this._shrunkenData(data)
    // else return this._shrunkenResponse()
  }
}

export default WeatherModels