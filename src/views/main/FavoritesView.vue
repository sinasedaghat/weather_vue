<script setup lang="ts">
import FavoriteCard from '@/components/FavoriteCard.vue';
import { useFavorites } from '@/composables/favorites';
import { useFavoritesCitiesStore } from '@/stores/favorites_cities'

const { favCities } = useFavorites()
const favoritesCities = useFavoritesCitiesStore()
</script>

<template>
  FavoritesView ===> {{ favCities }}
  <h2>Favorites</h2>
  <!-- {{ favoritesCities.favData }} -->
  <div v-for="fav in favoritesCities.favData" :key="fav.id">
    <FavoriteCard 
      :favorites="fav"
    />
  </div>
</template>
