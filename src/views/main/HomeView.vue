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
  const weather: Ref<ExpandedWeather | null> = ref(null)
  const pollution: Ref< ExpandedPollution| {}> = ref({})
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
      const xxx = Math. floor(Math. random()*10) + 1
      console.log(xxx)
      image.value = response.data.images_results[xxx].original
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
    max-width="550"
  >
    <v-img
      :src="image"
      height="320px"
      cover
    ></v-img>

    <v-card-title>
      {{ weather?.location }}
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

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
