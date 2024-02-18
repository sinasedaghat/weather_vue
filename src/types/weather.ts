type Temp = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
}

type ShrunkenPick = 'id' | 'city_id' | 'name' | 'country' | 'location' | 'main' | 'description' | 'icon' | 'temp'

type ShrunkenOmit = 'code' | 'city_id' | 'shift_timezone' | 'date' | 'country' | 'wind' | 'visibility' | 'humidity' | 'pressure'

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

export type ShrunkenWeather = Omit<ExpandedWeather, ShrunkenOmit>
