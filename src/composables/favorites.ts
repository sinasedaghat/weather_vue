import { onMounted, ref, type Ref } from "vue"

// export function useFavorites() {
export const useFavorites = () => {
  const favCities: Ref<string[]> = ref([])

  onMounted(() => {
    favCities.value = localStorage.getItem('favorites')?.split(',') ?? []
    // console.log('message from Favorites composable')
  })

  const updateFavs = (city: string) => {
    favCities.value.includes(city.toLowerCase()) ? 
      favCities.value = favCities.value.filter(item => item.toLowerCase() != city.toLowerCase()) : 
      favCities.value.push(city.toLowerCase())
    localStorage.setItem('favorites', favCities.value.join())
    // localStorage.setItem('favorites',favCities.value.toString())
  }

  return { favCities, updateFavs }
}