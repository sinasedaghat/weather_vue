<script setup lang="ts">
import FavoriteCard from '@/components/FavoriteCard.vue'
import { useFavoritesStore } from '@/stores/favorites'

  const favoritesStore = useFavoritesStore() 

</script>

<template>
  <!-- FavoritesView ===> {{ favoritesCities.citiesList }} -->
  <h2>Favorites</h2>

    {{ favoritesStore.cities }}
    {{ favoritesStore.citiesDataList }}



    


  <!-- favData ===> {{ favoritesCities.favData }} -->
  <v-card
    class="mx-auto mt-16" 
    variant="flat"
    max-width="1100px"
  >
  <v-row align="stretch" justify="start" dense>
    <v-col 
      v-for="(data, city) in favoritesStore.citiesDataList"
      :key="city"
      align-self="start"
      cols="12"
      md="6"
      class="fill-height"
      style="border: 2px solid red;"
    >
      <FavoriteCard
        :data="data"
        :city="(city as string)"
      />
    </v-col>
  </v-row>
    
  </v-card>





  
</template>
