import { APLDescription } from '@/data/air_pollution_level'

type Pollutant = {
  value: number
  color: string
}

type ShrunkenPick = 'aqi' | 'level' | 'description'

type ShrunkenOmit = 'id' | 'name' | 'co' | 'no2' | 'pm10' | 'pm25' | 'so2'

export interface ExpandedPollution {
  id: number
  name: string
  aqi: number
  level: keyof typeof APLDescription
  description: typeof APLDescription[keyof typeof APLDescription]
  co?: Pollutant
  no2?: Pollutant
  pm10?: Pollutant
  pm25?: Pollutant
  so2?: Pollutant
}

export interface ShrunkenPollution {}

export type ShrunkenWeather = Pick<ExpandedPollution, ShrunkenPick>