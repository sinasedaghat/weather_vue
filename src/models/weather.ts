import { type ExpandedWeather } from '@/types/weather'

class WeatherModels {
  private _data: any

  constructor(data: any) {
    this._data = data
  }

  expanded(): ExpandedWeather {
    console.log('data from model', this._data)
    return {
      name: this._data.name || 'name',
      country: this._data.sys.country || 'country'
    }
  }

  shrunken() {}
}

export default WeatherModels