import { ref, toValue, watch, computed, type Ref } from "vue"
import { defineStore } from "pinia"
import type { Favorites, FavData } from '@/types/favorites'
import type { ShrunkenWeather } from '@/types/weather'
import type { ShrunkenPollution } from '@/types/pollution'

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const cities: Ref<string[]> = ref([])
  const citiesData: Ref<Favorites | null> = ref(null)

  const hasFavorite = computed(() => Boolean(cities.value.length))
  const citiesList = computed(() => cities.value)
  const citiesDataList = computed(() => citiesData.value)
  const isFavorite = (city: Ref<string> | string) => {
    return computed(() => cities.value.includes(toValue(city).toLowerCase().trim())).value
  }

  watch(
    cities, 
    () => {
      console.log('citeis from favorites statemanagement', cities.value)
      citiesData.value = toValue(cities.value).reduce((obj, key) => {
        return {
          // ...citiesData.value,
          ...obj,
          // [key]: citiesData.value?.[key] || {}
          [key]: {}
        }
      }, {})
    },
    {
      once: true
    }
  )

  const updateBulkCities = (bulkCities: string[]) => {
    cities.value = [ ...bulkCities ]
  }
  const updateCities = (city: string) => {
    if(cities.value.includes(city.toLowerCase().trim())) {
      cities.value = cities.value.filter(item => item != city.toLowerCase().trim())
    } else {
      cities.value = [ ...cities.value, city.toLowerCase().trim() ]
      citiesData.value = {
        ...citiesData.value,
        [city.toLowerCase().trim()]: {}
      }
    }
  }

  const updateCityWeather = (city: Ref<string> | string, weather: Ref<ShrunkenWeather> | ShrunkenWeather) => {
    citiesData.value = {
      ...citiesData.value,
      [toValue(city).toLowerCase().trim()]: {
        ...citiesData.value?.[toValue(city).toLowerCase().trim()],
        weather: toValue(weather),
        date: new Date()
      }
    }
  }
  const updateCityPollution = (city: Ref<string> | string, pollution: Ref<ShrunkenPollution> | ShrunkenPollution) => {
    citiesData.value = {
      ...citiesData.value,
      [toValue(city).toLowerCase().trim()]: {
        ...citiesData.value?.[toValue(city).toLowerCase().trim()],
        pollution: toValue(pollution),
        date: new Date()
      }
    }
  }
  const updateCityImage = (city: Ref<string> | string, image: Ref<string> | string) => {
    citiesData.value = {
      ...citiesData.value,
      [toValue(city).toLowerCase().trim()]: {
        ...citiesData.value?.[toValue(city).toLowerCase().trim()],
        image: toValue(image),
        date: new Date()
      }
    }
  }
  const updateCityProperties = (city:  Ref<string> | string, data: Ref<FavData> | FavData) => {
    citiesData.value = {
      ...citiesData.value,
      [toValue(city).toLowerCase().trim()]: {
        ...citiesData.value?.[toValue(city).toLowerCase().trim()],
        ...data
      }
    }
  }

  return {
    cities, citiesData,
    hasFavorite, citiesList, citiesDataList, isFavorite,
    updateBulkCities, updateCities, 
    updateCityWeather, updateCityPollution, updateCityImage, updateCityProperties
  }
})