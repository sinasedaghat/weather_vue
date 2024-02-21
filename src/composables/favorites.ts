import { onMounted, ref, type Ref } from "vue"
import { useFavoritesCitiesStore } from '@/stores/favorites_cities'

// export function useFavorites() {
export const useFavorites = () => {
  const favoritesCities = useFavoritesCitiesStore()

  const favCities: Ref<string[]> = ref([])

  onMounted(() => {
    favCities.value = localStorage.getItem('favorites') ? localStorage.getItem('favorites')?.split(',') ?? [] : []
    favoritesCities.updateCities(favCities)
  })
  // const updateFavs = (cities: string[]) => {
    
  // }

  const upgradeFavs = (city: string) => {
    favCities.value.includes(city.toLowerCase()) ? 
      favCities.value = favCities.value.filter(item => item.toLowerCase() != city.toLowerCase()) : 
      favCities.value.push(city.toLowerCase())
    localStorage.setItem('favorites', favCities.value.join())
    // favoritesCities.updateCities(favCities)
    // localStorage.setItem('favorites',favCities.value.toString())
  }

  return { favCities, upgradeFavs }
}