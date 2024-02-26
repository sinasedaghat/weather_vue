import type { ExpandedPollution, ShrunkenPollution } from '@/types/pollution'
import { APL, APLDescription } from '@/data/air_pollution_level'

class PollutionModels {
  private _data?: any

  constructor(data?: any) {
    this._data = data
  }

  private _airPollutionLevel(aqi: number): keyof typeof APLDescription {
    const level: number = Math.floor(aqi / 50) - (aqi % 50 ? 0 : 1)
    return APL[level] as keyof typeof APLDescription
  }

  expanded(): ExpandedPollution {
    const expandedPollution: ExpandedPollution = {
      id: this._data.idx || 0,
      name: this._data.city.name || '',
      aqi: this._data.aqi || 0,
      level: this._airPollutionLevel(this._data.aqi || 0) ?? 'HAZARDOUS',
      description: APLDescription[this._airPollutionLevel(this._data.aqi || 0) ?? 'HAZARDOUS'],
    }
    if(this._data.iaqi?.pm25?.v) expandedPollution['pm25'] = {
      value: this._data.iaqi?.pm25?.v, 
      color: APLDescription[this._airPollutionLevel(this._data.iaqi?.pm25?.v)].color
    }
    if(this._data.iaqi?.pm10?.v) expandedPollution['pm10'] = {
      value: this._data.iaqi?.pm10?.v, 
      color: APLDescription[this._airPollutionLevel(this._data.iaqi?.pm10?.v)].color
    }
    if(this._data.iaqi?.co?.v) expandedPollution['co'] = {
      value: this._data.iaqi?.co?.v,
      color: APLDescription[this._airPollutionLevel(this._data.iaqi?.co?.v)].color
    }
    if(this._data.iaqi?.no2?.v) expandedPollution['no2'] = {
      value: this._data.iaqi?.no2?.v,
      color: APLDescription[this._airPollutionLevel(this._data.iaqi?.no2?.v)].color
    }
    if(this._data.iaqi?.so2?.v) expandedPollution['so2'] = {
      value: this._data.iaqi?.so2?.v,
      color: APLDescription[this._airPollutionLevel(this._data.iaqi?.so2?.v)].color
    }

    return expandedPollution
  }

  private _shrunkenResponse(): ShrunkenPollution {
    const shrunkenPollution: ShrunkenPollution = {
      aqi: this._data.aqi || 0,
      level: this._airPollutionLevel(this._data.aqi || 0) ?? 'HAZARDOUS',
      description: APLDescription[this._airPollutionLevel(this._data.aqi || 0) ?? 'HAZARDOUS'],
    }
    return shrunkenPollution
  }

  private _shrunkenData(data: ExpandedPollution): ShrunkenPollution {
    const shrunkenPollution: ShrunkenPollution = {
      aqi: data.aqi,
      level: data.level,
      description: data.description,
    }
    return shrunkenPollution
  }

  shrunkenAdapter(data?: ExpandedPollution): ShrunkenPollution {
    return data ? this._shrunkenData(data) : this._shrunkenResponse()
  }
}

export default PollutionModels