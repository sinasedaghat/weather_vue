import { APLDescription } from '@/data/air_pollution_level'

type Pollutant = {
  value: number
  color: string
}

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