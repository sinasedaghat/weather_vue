<script setup lang="ts">
import FavoriteCard from '@/components/FavoriteCard.vue';
import { useFavorites } from '@/composables/favorites';
import { createURL } from '@/utils/createURL'
import { useFavoritesCitiesStore } from '@/stores/favorites_cities'

import weatherAPI from '@/services/weather'
import pollutionAPI from '@/services/pollution'
import weatherModel from '@/models/weather'
import pollutionModel from '@/models/pollution'
import type { ShrunkenWeather } from '@/types/weather'
import type { ShrunkenPollution  } from '@/types/pollution'

  const { upgradeFavs } = useFavorites()
  const favoritesCities = useFavoritesCitiesStore()

  const search = (city: string) => {
    let weather: ShrunkenWeather | null = null
    let image: string
    weatherAPI.getWeather(city).then(async (response) => {
      weather = await {...new weatherModel(response.data).shrunkenAdapter()}
    })
    .catch(() => {
      image = createURL('error')
    })
    .finally(() => {
      // city.value = ''
    })
  }

  const getPollution = (city: string) => {
    let pollution: ShrunkenPollution | null = null
    pollutionAPI.getPollution(city)
    .then(async (response) => {
      if(response.data.status.toLocaleLowerCase() == 'ok') pollution = await {...new pollutionModel(response.data.data).shrunkenAdapter()}
    })
  }


</script>

<template>
  FavoritesView ===> {{ favoritesCities.citiesList }}
  <h2>Favorites</h2>
  favData ===> {{ favoritesCities.favData }}
  <v-card
    class="mx-auto mt-16" 
    variant="flat"
    max-width="1100px"
  >
  <v-row align="start" justify="start" dense>
    <v-col 
      v-for="(fav, i) in favoritesCities.favData"
      :key="i"
      align-self="start"
      cols="12"
      md="6"
    >
      <FavoriteCard 
        :favorites="fav"
      />
    </v-col>
  </v-row>
    
  </v-card>





  
</template>
