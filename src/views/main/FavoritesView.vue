<script setup lang="ts">
import FavoriteCard from '@/components/FavoriteCard.vue'
import { useFavoritesStore } from '@/stores/favorites'
import type { FavData } from '@/types/favorites';

  const favoritesStore = useFavoritesStore() 
</script>

<template>
  <v-card
    class="mx-auto my-16" 
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
      >
        <FavoriteCard
          :data="data"
          :city="(city as string)"
          @updateData="(data) => favoritesStore.updateCityProperties(city as string ,data as FavData)"
        />
      </v-col>
    </v-row>
  </v-card>  
</template>
