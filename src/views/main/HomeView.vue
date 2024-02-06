<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useLocale } from 'vuetify'
import weatherAPI from '@/services/weather'
import pollutionAPI from '@/services/pollution'
import imageAPI from '@/services/image'
import weatherModel from '@/models/weather'
import pollutionModel from '@/models/pollution'
import { type ExpandedWeather } from '@/types/weather'
import { type ExpandedPollution  } from '@/types/pollution'
import { APLDescription } from '@/data/air_pollution_level'
import sky from '@/assets/images/cloud-background.mp4'

  const { t } = useLocale()
  const valid: Ref<boolean> = ref(false)
  const city: Ref<string> = ref('')
  const weather: Ref<ExpandedWeather | null> = ref(null)
  const pollution: Ref< ExpandedPollution| null> = ref(null)
  const image: Ref<string> = ref('')


  const show = ref(false)


  
  const required = (v: string) => {
    return !!v || t('FIELD_IS_REQUIRED')
  }

  const getWeather = () => {
    weatherAPI.getWeather(city)
    .then(async (response) => {
      weather.value = await {...new weatherModel(response.data).expanded()}
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      console.log('finally')
    })
  }

  const getPollution = () => {
    pollutionAPI.getPollution(city)
    .then(async (response) => {
      pollution.value = await {...new pollutionModel(response.data.data).expanded()}
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      console.log('finally')
    })
  }

  const getImage = () => {
    imageAPI.getImage(city)
    .then(async (response) => {
      // console.log(response.data)
      // const xxx = 
      image.value = response.data.images_results[Math.floor(Math. random()*5) + 1].original
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      console.log('finally')
    })
  }

  const search = () => {
    // console.log(city.value)
    getWeather()
    getPollution()
    getImage()
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
      width="600px" 
      height="100px"
    >
      <v-card-text>
        <v-row align="center" justify="center" dense>
          <!-- city text field -->
          <v-col cols="10">
            <v-form v-model="valid">
              <v-text-field
                v-model="city"
                class="elevation-0"
                color="primary"
                variant="solo"
                :placeholder="t('ENTER_CITY_NAME')"
                :rules="[required]"
                hide-details
                rounded
              />
            </v-form>
          </v-col>
          <!-- search button -->
          <v-col cols="auto">
            <v-btn 
              :disabled="!valid"
              @click="search"
              :variant="valid ? 'elevated' : 'outlined'" 
              color="white" 
              icon
            >
              <v-icon color="primary">mdi-map-search</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>


  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-img
      :src="image"
      height="320px"
      gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,1)"
      class="align-end text-white"
      cover
    >
      <v-card-title>
        <v-row align="start" justify="space-between" dense>
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
          <v-col class="ma-0 pa-0" cols="12">
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
    </v-img>
    <v-card-text>
      <v-row align="start" justify="start" dense>
        <v-col class="ma-0 pa-0" cols="12">
          <v-avatar size="60" class="mt-n3 me-n2">
            <v-img :src="weather?.icon" alt="Cloud Logo" />
          </v-avatar>
          <span class="text-h4">
            {{ weather?.temp?.temp }}°C
          </span>
        </v-col>
        <v-col class="ma-0 pa-0 ms-3" cols="12">
          <!-- <span class="text-subtitle-2">
            {{ t('TEMP_FEELS_LIKE') }} {{ weather?.temp?.feels_like }} °C
          </span> -->
          <!-- <span class="text-subtitle-2 ms-1">
            {{ t('TEMP_MAX') }} {{ weather?.temp?.temp_max }} °C
          </span>
          <span class="text-subtitle-2 ms-1">
            {{ t('TEMP_MIN') }} {{ weather?.temp?.temp_min }} °C
          </span> -->
          The air temperature will be {{ weather?.temp?.feels_like }}°C feels like, the maximum will be {{ weather?.temp?.temp_max }}°C and the minimum will be {{ weather?.temp?.temp_min }}°C.
          <!-- {{ $t(APLDescription[pollution?.level || 'EMPTY'].desc: '') }} -->
          <!-- Feels like {{ weather?.temp?.feels_like }}°C, the high will be {{ weather?.temp?.temp_min }}°C, the low will be {{ weather?.temp?.temp_max }}°C. -->
        </v-col>
      </v-row>
    </v-card-text>





      <!-- weather -->
      <!-- <v-row style="border: 1px solid #fff;"  align="start" justify="start"> -->
        <!-- icon -->
        <!-- <v-col style="border: 1px solid #fff;" cols="12" class="mt-n7 ms-n4">
          <v-avatar size="50">
            <v-img style="display: inline-block;" width="50" height="50" :src="weather?.icon" alt="Cloud Logo" />
          </v-avatar>
          <h4 style="display: inline-block;">12 C</h4>
        </v-col> -->
        <!-- location -->
        <!-- <v-col cols="auto">
          <span 
            class="text-subtitle-1" 
            v-html="`${weather?.main} <small>&quot;${weather?.description}&quot;</small>`" 
          />
        </v-col> -->
      <!-- </v-row> -->
    

    <!-- <v-card-title>
      {{ weather?.location }}
    </v-card-title> -->



    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>


    <v-card
      style="border: 2px solid #fff;"
      class="mx-auto mt-16" 
      rounded="xl"
      variant="flat"
      width="900px"
    >
    <v-avatar class="mx-5" size="200">
      <!-- <v-img :src="imageOrigin" alt="Cloud Logo" /> -->
      <v-img :src="weather?.icon" alt="Cloud Logo" />
    </v-avatar>
      {{ weather }}
  
      <hr>

      {{ pollution }}

      <hr>

      <v-avatar
        style="border: 2px red solid;"
        color="grey"
        size="150"
        rounded="0"
      >
        <v-img cover :src="image"></v-img>
      </v-avatar>
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
