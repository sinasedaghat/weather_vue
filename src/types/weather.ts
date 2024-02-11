type Temp = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
}

export interface ExpandedWeather {
  id: number
  city_id: number
  code?: number
  shift_timezone?: number
  date?: Date
  name: string
  country: string
  location: string
  main: string
  description: string
  icon: string
  temp: Temp & {[k: string]: number}
  wind?: string
  visibility?: string
  humidity?: string
  pressure?: string
}
