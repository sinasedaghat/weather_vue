import { ref, computed, toValue } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Favorites } from '@/types/favorites'
import type { ShrunkenWeather } from '@/types/weather'
import type { ShrunkenPollution } from '@/types/pollution'

export const useFavoritesCitiesStore = defineStore('favoritesCities', () => {
  const cities: Ref<string[]> = ref([])
  const citiesData: Ref<Favorites | null> = ref(null)

  const hasFavs = computed(() => Boolean(cities.value.length))
  const citiesList = computed(() => cities.value)
  const favData = computed(() => citiesData.value)

  function updateCities(data: Ref<string[]> | string[]) {
    cities.value = [ ...toValue(data) ]
  }

  const minorUpdate = (weather: ShrunkenWeather, pollution: ShrunkenPollution, image?: string) => {
    console.log('weather from minorUpdate() in favoritesCities statemanagement ===>', weather)
    console.log('pollution from minorUpdate() in favoritesCities statemanagement ===>', pollution)
    citiesData.value = {
      ...citiesData.value,
      [weather.name.toLowerCase()] : {
        ...weather,
        ...pollution,
        image: image ?? '',  // todo update default of image
        date: new Date()
      }
    }
  }

  const massUpdate = () => { }

  return { 
    cities, citiesData, 
    hasFavs, citiesList, favData,
    updateCities, minorUpdate, massUpdate,
  }
})
