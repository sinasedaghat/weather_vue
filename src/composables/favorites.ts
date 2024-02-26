import { onMounted, ref, type Ref } from "vue"
import { useFavoritesStore } from "@/stores/favorites"

export const useFavorites = () => {
  const favoritesStore = useFavoritesStore()
  const favCities: Ref<string[]> = ref([])

  onMounted(() => {
    favCities.value = localStorage.getItem('favorites')?.split(',') ?? []
    favoritesStore.updateBulkCities(favCities.value)
  })

  const upgradeFavs = (city: string) => {
    favCities.value.includes(city.toLowerCase()) ? 
      favCities.value = favCities.value.filter(item => item.toLowerCase() != city.toLowerCase()) : 
      favCities.value.push(city.toLowerCase())
    localStorage.setItem('favorites', favCities.value.join())
  }

  return { favCities, upgradeFavs }
}