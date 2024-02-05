import { type ExpandedPollution } from '@/types/pollution'

class PollutionModels {
  private _data: any

  constructor(data: any) {
    this._data = data
  }

  expanded(): ExpandedPollution {
    // console.log('data from model', this._data.iaqi?.pm10?.v ?? 0)
    return {
      id: this._data.idx || 0,
      name: this._data.city.name || '',
      co: this._data.iaqi?.co?.v || 0,
      dew: this._data.iaqi?.dew?.v || 0,
      h: this._data.iaqi?.h?.v || 0,
      no2: this._data.iaqi?.no2?.v || 0,
      p: this._data.iaqi?.p?.v || 0,
      pm10: this._data.iaqi?.pm10?.v ?? 0,
      so2: this._data.iaqi?.so2?.v || 0,
      t: this._data.iaqi?.t?.v || 0,
      w: this._data.iaqi?.w?.v || 0,
    }
  }

  shrunken() {}
}

export default PollutionModels