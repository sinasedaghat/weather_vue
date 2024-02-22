<script setup lang="ts">
// import FavoriteCard from '@/components/FavoriteCard.vue'
import { useFavoritesStore } from '@/stores/favorites'

  const favoritesStore = useFavoritesStore() 

  const logData = () => {
    // console.log('logData ===>', favoritesCities.favData?.value)
  }

</script>

<template>
  <!-- FavoritesView ===> {{ favoritesCities.citiesList }} -->
  <h2 @click="logData">Favorites</h2>

    {{ favoritesStore.cities }}
    {{ favoritesStore.citiesDataList }}






  <!-- favData ===> {{ favoritesCities.favData }} -->
  <!-- <v-card
    class="mx-auto mt-16" 
    variant="flat"
    max-width="1100px"
  >
  <v-row align="start" justify="start" dense>
    <v-col 
      v-for="(city, i) in favoritesCities.citiesList"
      :key="i"
      align-self="start"
      cols="12"
      md="6"
    >
      <FavoriteCard
        :city="city"
      />
    </v-col>
  </v-row>
    
  </v-card> -->





  
</template>
