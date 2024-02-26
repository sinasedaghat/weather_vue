<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import FavoriteCard from '@/components/FavoriteCard.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useFavorites } from '@/composables/favorites';
import type { FavData } from '@/types/favorites';
import router from '@/router';

  const favoritesStore = useFavoritesStore()
  const { upgradeFavs } = useFavorites()

  const timeMilliseconds: Ref<number> = ref(new Date().getTime()) 
  const intervalId: Ref<number | null> = ref(null)
  const timeCounter: Ref<number> = ref(0)

  watch(
    () => favoritesStore.hasFavorite,
    () => {
      if(!favoritesStore.hasFavorite) timeCounter.value = 9
    }, 
  )

  watch(
    timeCounter,
    () => {
      if(timeCounter.value) {
        setTimeout(() => {
          timeCounter.value -= 1
        }, 1000);
      }
      else router.push({ name: 'Home' })
    }, 
  )

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
    <!-- city cards -->
    <v-row v-if="favoritesStore.hasFavorite" align="stretch" justify="start" dense>
      <v-col 
        v-for="(data, city) in favoritesStore.citiesDataList"
        :key="city"
        align-self="start"
        cols="12"
        md="6"
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
    <!-- hasnt favorit -->
    <v-row v-else align="center" justify="center" dense>
      <v-col cols="auto">
      <span class="text-h6 font-weight-bold text-primary">
        Your favorites list is empty, you will be returned to the home page in <span class="font-weight-black text-secondary">{{ timeCounter }}</span> seconds
      </span>
      <!-- dot-elastic loading -->
      <div class="stage">
        <div class="dot-elastic"></div>
      </div>
      </v-col>
      <v-col class="text-center" cols="12">
        <v-btn
          color="secondary"
          variant="tonal"
          @click="router.push({ name: 'Home' })"
        >
          <span class="font-weight-bold">Go To Home</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>  
</template>
<style scoped>
  .stage {
    display: inline-block;
    margin-left: 5px;
  }
  .dot-elastic {
    position: relative;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #9747FF;
    color: #9747FF;
    animation: dot-elastic 1s infinite linear;
  }
  .dot-elastic::before, .dot-elastic::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }
  .dot-elastic::before {
    left: -7px;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #9747FF;
    color: #9747FF;
    animation: dot-elastic-before 1s infinite linear;
  }
  .dot-elastic::after {
    left: 7px;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #9747FF;
    color: #9747FF;
    animation: dot-elastic-after 1s infinite linear;
  }

  @keyframes dot-elastic-before {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1.3);
    }
    50% {
      transform: scale(1, 0.5);
    }
    75% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
  @keyframes dot-elastic {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1, 1.3);
    }
    75% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
  @keyframes dot-elastic-after {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1, 0.5);
    }
    75% {
      transform: scale(1, 1.3);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>
