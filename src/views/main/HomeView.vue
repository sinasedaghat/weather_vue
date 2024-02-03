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
import sky from '@/assets/images/cloud-background.mp4'

  const { t } = useLocale()
  const valid: Ref<boolean> = ref(false)
  const city: Ref<string> = ref('')
  const weather: Ref<ExpandedWeather | {}> = ref({})
  const pollution: Ref< ExpandedPollution| {}> = ref({})
  
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
      console.log(response.data)
      // let x = new weatherModel(response.data)
      // console.log('getPollution', response.data)
      // pollution.value = await {...new pollutionModel(response.data.data).expanded()}
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      console.log('finally')
    })
  }

  const search = () => {
    console.log(city.value)
    getWeather()
    getPollution()
    getImage()
  }

  
</script>

<template>
  <v-container fluid style="border: 2px solid #fff;">
    <!-- background -->
    <video autoplay loop muted class="video-background ">
      <source :src="sky" type="video/webm" />
      <source :src="sky" type="video/mp4" />
    </video>
    <!-- input card -->
    <v-card
      style="border: 2px solid #fff;"
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
      style="border: 2px solid #fff;"
      class="mx-auto mt-16" 
      variant="flat"
      width="600px" 
      min-height="100px"
    >
      {{ weather }}
  
      <hr>

      {{ pollution }}
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
