import { type ExpandedPollution } from '@/types/pollution'

class PollutionModels {
  private _data: any

  constructor(data: any) {
    this._data = data
  }

  expanded(): ExpandedPollution {
    // console.log('data from model', this._data)
    return {
      id: this._data.idx || 0,
      name: this._data.city.name || '',
      co: this._data.iaqi.co || 0,
      dew: this._data.iaqi.dew || 0,
      h: this._data.iaqi.h || 0,
      no2: this._data.iaqi.no2 || 0,
      p: this._data.iaqi.p || 0,
      pm10: this._data.iaqi.pm10 || 0,
      so2: this._data.iaqi.so2 || 0,
      t: this._data.iaqi.t || 0,
      w: this._data.iaqi.w || 0,
    }
  }

  shrunken() {}
}

export default PollutionModels