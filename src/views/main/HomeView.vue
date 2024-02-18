<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import { useLocale } from 'vuetify'
import { useFavoritesCitiesStore } from '@/stores/favorites_cities'
import { useFavorites } from '@/composables/favorites'
import { createURL } from '@/utils/createURL'
import weatherAPI from '@/services/weather'
import pollutionAPI from '@/services/pollution'
import imageAPI from '@/services/image'
import weatherModel from '@/models/weather'
import pollutionModel from '@/models/pollution'
import type { ExpandedWeather } from '@/types/weather'
import type { ExpandedPollution  } from '@/types/pollution'
import type { FavData } from '@/types/favorites'
import { chips as weatherChip } from '@/data/chips_weather'
import { chips as pollutionChip } from '@/data/chips_pollution'
import sky from '@/assets/images/cloud-background.mp4'

  const { t } = useLocale()
  const { upgradeFavs } = useFavorites()
  const favoritesCities = useFavoritesCitiesStore()
  const valid: Ref<boolean> = ref(false)
  const city: Ref<string> = ref('')
  const weather: Ref<ExpandedWeather | null> = ref(null)
  const pollution: Ref< ExpandedPollution | null> = ref(null)
  const image: Ref<string> = ref(createURL('default-cart'))

  const analysisImageURL = computed(() => {
    return image.value.search(window.location.origin) == -1
  })

  const required = (v: string) => {
    return !!v || t('FIELD_IS_REQUIRED')
  }
  const difrent = (v: string) => {
    return !!v && v.toLocaleLowerCase() != weather?.value?.name.toLocaleLowerCase() || t('FIELD_IS_REQUIRED')
  }

  const search = () => {
    weather.value = null
    pollution.value = null
    image.value = createURL('magnifier', 'gif')
    weatherAPI.getWeather(city).then(async (response) => {
      weather.value = await {...new weatherModel(response.data).expanded()}
      // Promise.allSettled([pollutionAPI.getPollution(city), imageAPI.getImage(city)]).then((values) => console.log(values))
      await getPollution()
      await getImage()
    })
    .catch(() => {
      image.value = createURL('error')
    })
    .finally(() => {
      city.value = ''
    })
  }
  const getPollution = () => {
    pollutionAPI.getPollution(city)
    .then(async (response) => {
      if(response.data.status.toLocaleLowerCase() == 'ok')pollution.value = await {...new pollutionModel(response.data.data).expanded()}
    })
  }
  const getImage = () => {
    imageAPI.getImage(city)
    .then(async (response) => {
      image.value = response.data.images_results[Math.floor(Math. random()*5) + 1].original
    })
    .catch(() => {
      image.value = createURL('city')
    })
  }
  const favAction = () => {
    upgradeFavs(weather.value?.name.toLowerCase() ?? '')
    // FavData
    // const data = [
    //   new weatherModel().shrunkenAdapter(weather.value as ExpandedWeather)
    // ]
    favoritesCities.minorUpdate(
      new weatherModel().shrunkenAdapter(weather.value as ExpandedWeather),
      new pollutionModel().shrunkenAdapter(pollution.value as ExpandedPollution)
    )
  }
</script>

<template>
  <v-container>
    <!-- background -->
    <video autoplay loop muted class="video-background ">
      <source :src="sky" type="video/webm" />
      <source :src="sky" type="video/mp4" />
    </video>
    <!-- input card -->
    <v-card
      class="mx-auto mt-16" 
      variant="flat"
      color="#00000000"
      max-width="600px" 
      max-height="100px"
    >
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="search">
          <v-row align="center" justify="center" dense>
            <!-- city text field -->
            <v-col cols="10">
              <!-- @keyup.enter.prevent="search" -->
              <!-- @keyup.enter.prevent="'submit'" -->
              <v-text-field
                v-model="city"
                class="elevation-0"
                color="primary"
                variant="solo"
                :placeholder="t('ENTER_CITY_NAME')"
                :rules="[required, difrent]"
                hide-details
                rounded
              />
            </v-col>
            <!-- search button -->
            <v-col cols="auto">
              <!-- @click="search" -->
              <v-btn 
                :disabled="!valid"
                type="submit"
                :variant="valid ? 'elevated' : 'outlined'" 
                color="white" 
                icon
                >
                <v-icon color="primary">mdi-map-search</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    
    <!-- result data -->
    <v-card
      rounded="xl"
      class="mx-auto"
      max-width="600"
    >
      <!-- header data -->
      <v-img
        :src="image"
        height="320px"
        :gradient="analysisImageURL || image.search('city') != -1? 'to bottom, rgba(0,0,0,0), rgba(0,0,0,1)' : ''"
        :class="`align-end ${weather ? 'text-white' : ''}`"
        :cover="analysisImageURL"
      >
        <!-- title -->
        <v-card-title v-if="weather">
          <v-row align="start" justify="start" dense>
            <!-- city location -->
            <v-col class="ma-0 pa-0" cols="12">
              <span class="text-h4" v-text="weather?.location" />
            </v-col>
            <!-- weather description -->
            <v-col class="ma-0 pa-0" cols="12">
              <v-tooltip 
                :text="t('WEATHER_TOOLTIP')"
                location="bottom"
              >
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" size="x-small" color="#FFF" start>mdi-weather-cloudy</v-icon>
                </template>
              </v-tooltip>
              <span 
                class="text-subtitle-1" 
                v-html="`${weather?.main} &quot;${weather?.description}&quot;`" 
              />
            </v-col>
            <!-- pollution level -->
            <v-col v-if="pollution" class="ma-0 pa-0" cols="12">
              <v-tooltip 
                :text="t('POLLUTION_LEVEL_TOOLTIP')"
                location="bottom"
              >
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" size="x-small" color="#FFF" start>mdi-smoke</v-icon>
                </template>
              </v-tooltip>
              <span 
                class="text-subtitle-1" 
                v-html="`${t(pollution?.level ?? '')}`" 
              />
            </v-col>
          </v-row>
        </v-card-title>
        <!-- decription app -->
        <v-card-title v-else>
          <!-- <v-row align="start" justify="start" dense>
            <v-col class="ma-0 pa-0" cols="12"> -->
              <span class="text-caption">
                <!-- It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Why do we use it?

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). -->

              </span>
            <!-- </v-col>
          </v-row> -->
        </v-card-title>
      </v-img>
      <!-- details -->
      <v-card-text v-if="weather">
        <!-- main details -->
        <v-row class="ma-0 pa-0" align="start" justify="start" dense>
          <!-- weather -->
          <v-col class="ma-0 pa-0" cols="12" md="6">
            <!-- icon & description -->
            <v-tooltip 
              location="end"
              width="250"
            >
              <template v-slot:activator="{ props }">
                <v-avatar v-bind="props" size="60" class="mt-n3 me-n2">
                  <v-img :src="weather?.icon" alt="Cloud Logo" />
                </v-avatar>
              </template>
              <div>
                <span class="text-subtitle-2 font-weight-bold d-block">{{ t('WEATHER_TOOLTIP') }}</span>
                <span class="text-caption font-weight-bold d-block ms-2">{{ weather?.main }} - {{ weather?.description }}</span>
                <span class="text-caption d-block ms-2">
                  The air temperature will be {{ weather?.temp?.feels_like }}°C feels like, the maximum will be {{ weather?.temp?.temp_max }}°C and the minimum will be {{ weather?.temp?.temp_min }}°C.
                </span>
              </div>
            </v-tooltip>
            <!-- temp -->
            <span class="text-h4">
              {{ weather?.temp?.temp }}°C
            </span>
          </v-col>
          <!-- pollution -->
          <v-col v-if="pollution" class="ma-0 pa-0" cols="12" md="5">
            <!-- icon & description -->
            <v-tooltip 
              location="end"
              width="250"
            >
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" class="mt-n4 me-2" size="35" :color="pollution?.description.color">
                  {{ pollution?.description.icon }}
                </v-icon>
              </template>
              <div>
                <span class="text-subtitle-2 font-weight-bold d-block">{{ t('POLLUTION_LEVEL_TOOLTIP') }}</span>
                <span class="text-caption font-weight-bold d-block ms-2">{{ t(pollution?.level ?? '') }}</span>
                <span class="text-caption d-block ms-2">
                  {{ $t(pollution?.description?.desc || '') }}
                </span>
              </div>
            </v-tooltip>
            <!-- AQI -->
            <span class="text-h4">
              {{ pollution?.aqi }}
            </span>
          </v-col>
          <v-spacer></v-spacer>
          <!-- fav button -->
          <v-col class="ma-0 pa-0" cols="12" md="auto">
            <!-- icon & description -->
            <v-tooltip 
              location="end"
              width="250"
            >
              <template v-slot:activator="{ props }">
                <v-icon 
                  v-bind="props" 
                  class="mb-n4" 
                  size="25" 
                  :color="favoritesCities.citiesList.includes(weather?.name.toLowerCase()) ? 'error' : 'gray'"
                  @click="favAction"
                >
                  {{ favoritesCities.citiesList.includes(weather?.name.toLowerCase()) ? 'mdi-heart' : 'mdi-heart-outline' }}
                </v-icon>
              </template>
              <span class="text-caption">{{
                favoritesCities.citiesList.includes(weather?.name.toLowerCase()) ? 'Removal from the list of favorite cities' : 'Add to list of favorite cities'
              }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-divider />
        <!-- chips details -->
        <v-row class="ma-0 pa-0" align="start" justify="start" dense>
          <!-- weather -->
          <v-col v-if="weather" class="ma-0 pa-0" cols="12">
            <v-chip
              v-for="tag in Object.values(weatherChip).filter(tag => weather && Boolean(weather[tag.value as 'wind' | 'pressure' | 'humidity' | 'visibility']))"
              :key="tag.id"
              class="me-2 mt-2"
              density="comfortable"
              :color="tag.color"
            >
              <small>
                <span class="font-weight-bold me-1">{{ tag.label }}:</span>
                <span class="font-weight-medium">{{ weather[tag.value as 'wind' | 'pressure' | 'humidity' | 'visibility'] }}</span>
              </small>
            </v-chip>
          </v-col>
          <v-divider v-if="pollution" class="mt-2 mx-16" />
          <!-- pollution -->
          <v-col v-if="pollution" class="ma-0 pa-0" cols="12">
            <v-chip
              v-for="tag in Object.values(pollutionChip).filter(tag => pollution && Boolean(pollution[tag.value as 'co' | 'no2' | 'pm10' | 'pm25' | 'so2']?.value))"
              :key="tag.id"
              class="me-2 mt-2"
              density="comfortable"
              :color="pollution[tag.value as 'co' | 'no2' | 'pm10' | 'pm25' | 'so2']?.color"
              >
              <small>
                <span class="font-weight-bold me-1">{{ tag.label }}:</span>
                <span class="font-weight-medium">{{ pollution[tag.value as 'co' | 'no2' | 'pm10' | 'pm25' | 'so2']?.value }}µg/m³</span>
              </small>
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.video-background {
  position: absolute;
  z-index: -1000;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
/* .content {
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  height: 100%;
  padding: 20px;
} */
</style>
