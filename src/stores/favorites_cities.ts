import { ref, computed, toValue } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Favorites } from '@/types/favorites'
import weatherAPI from '@/services/weather'
import pollutionAPI from '@/services/pollution'
import weatherModel from '@/models/weather'
import pollutionModel from '@/models/pollution'
import type { ShrunkenWeather } from '@/types/weather'
import type { ShrunkenPollution } from '@/types/pollution'

export const useFavoritesCitiesStore = defineStore('favoritesCities', () => {
  const cities: Ref<string[]> = ref([])
  const citiesData: Ref<Favorites | null> = ref(null)

  const hasFavs = computed(() => Boolean(cities.value.length))
  const citiesList = computed(() => cities.value)
  const favData = computed(() => citiesData.value)

  const getData = async(city: string) => {
    console.log('getData ====> ', city)
    // let weather: ShrunkenWeather | null = null
    // let image: string
    await weatherAPI.getWeather(city).then(async (response) => {
      await weatherUpdate(city, {...new weatherModel(response.data).shrunkenAdapter()})
    })
    .catch(() => {
      // image = createURL('error')
    })

    await pollutionAPI.getPollution(city).then(async (response) => {
      if(response.data.status.toLocaleLowerCase() == 'ok') await pollutionUpdate(city, {...new pollutionModel(response.data.data).shrunkenAdapter()})
    })
    
  }

  function updateCities(data: Ref<string[]> | string[]) {
    cities.value = [ ...toValue(data) ]
    citiesData.value = toValue(data).reduce((obj, key) => {
      return {
        ...favData,
        ...obj,
        [key]: citiesData.value?.[key] || {}
      }
    }, {})
  }

  const minorUpdate = (weather: ShrunkenWeather, image?: string, pollution?: ShrunkenPollution) => {
    console.log('weather from minorUpdate() in favoritesCities statemanagement ===>', weather)
    console.log('pollution from minorUpdate() in favoritesCities statemanagement ===>', pollution)
    citiesData.value = {
      ...citiesData.value,
      [weather.name.toLowerCase()] : {
        weather: {...weather},
        pollution: {...pollution},
        image: image ?? '',  // todo update default of image
        date: new Date()
      }
    }
  }

  const weatherUpdate = (city: string, weather: ShrunkenWeather) => {
    console.log('citiesData.value ==> weatherUpdate', citiesData.value)
    citiesData.value = {
      ...citiesData.value,
      [city.toLowerCase()] : {
        ...(citiesData.value as Favorites)[city.toLowerCase()] ?? {},
        weather: {...weather},
        date: new Date()
      }
    }

    console.log('citiesData.value ==> weatherUpdate', citiesData.value)
  }

  const pollutionUpdate = (city: string, pollution: ShrunkenPollution) => {
    console.log('citiesData.value ==> pollutionUpdate', citiesData.value)
    citiesData.value = {
      ...citiesData.value,
      [city.toLowerCase()] : {
        ...(citiesData.value as Favorites)[city.toLowerCase()] ?? {},
        pollution: {...pollution},
        date: new Date()
      }
    }
  }

  return { 
    cities, citiesData, 
    hasFavs, citiesList, favData,
    getData, updateCities, minorUpdate,
  }
})
