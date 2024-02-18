import { type ShrunkenWeather } from './weather'
import { type ShrunkenPollution } from './pollution'

export type FavData = ShrunkenWeather & Partial<ShrunkenPollution> & {
  date: Date
  image?: string 
}

export type Favorites = { [key: string]: FavData }