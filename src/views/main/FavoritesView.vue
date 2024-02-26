<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import FavoriteCard from '@/components/FavoriteCard.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useFavorites } from '@/composables/favorites';
import type { FavData } from '@/types/favorites';

  const favoritesStore = useFavoritesStore()
  const { upgradeFavs } = useFavorites()

  const timeMilliseconds: Ref<number> = ref(new Date().getTime()) 
  const intervalId = ref<number | null>(null)

  const upgradeFavorites = async (city: string) => {
    await upgradeFavs(city)
    await favoritesStore.removeCity(city)
  }
      
  onMounted(() => {
    intervalId.value = setInterval(() => {
      timeMilliseconds.value += 1000
    }, 1000);
  });

  onBeforeUnmount(() => {
    if (intervalId.value) {
      clearInterval(intervalId.value)
      timeMilliseconds.value = 0
    }
  });
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
          :time="timeMilliseconds"
          @updateData="(data) => favoritesStore.updateCityProperties(city as string ,data as FavData)"
          @upgradeFavorites="upgradeFavorites"
        />
      </v-col>
    </v-row>
  </v-card>  
</template>
