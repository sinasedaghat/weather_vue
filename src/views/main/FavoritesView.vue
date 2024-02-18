<script setup lang="ts">
import { useFavorites } from '@/composables/favorites';
import { useFavoritesCitiesStore } from '@/stores/favorites_cities'

const { favCities } = useFavorites()
const favoritesCities = useFavoritesCitiesStore()
</script>

<template>
  FavoritesView ===> {{ favCities }}
  <h2>Favorites</h2>
  {{ favoritesCities.favData }}
</template>
