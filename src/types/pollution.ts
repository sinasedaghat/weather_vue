import { APLDescription } from '@/data/air_pollution_level'

export interface ExpandedPollution {
  id: number
  name: string
  aqi: number
  level: keyof typeof APLDescription
  description: typeof APLDescription[keyof typeof APLDescription]
  co: number
  dew: number
  h: number
  no2: number
  p: number
  pm10: number
  pm25: number
  so2: number
  t: number
  w: number
}

export interface ShrunkenPollution {}