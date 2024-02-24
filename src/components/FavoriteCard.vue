<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { FavData } from '@/types/favorites'
import { createURL } from '@/utils/createURL'
import { capitalizeFirstLetters } from '@/utils/capitalize'
import { localTime } from '@/utils/timeDecoration'
import weatherAPI from '@/services/weather'
import pollutionAPI from '@/services/pollution'
import weatherModel from '@/models/weather'
import pollutionModel from '@/models/pollution'

const emit = defineEmits(['updateData'])

  interface Props {
    data: FavData
    city: string
  }

  const props = defineProps<Props>()
  const cityData: Ref<FavData> = ref({})

  onMounted(() => {
    if(!props.data?.date) {
      cityData.value.date = new Date
      getWeather()
      getPollution()
    }
  })

  const getWeather = () => {
    weatherAPI.getWeather(props.city)
    .then(async (response) => {
      cityData.value.weather = await { ...new weatherModel(response.data).shrunkenAdapter() }
      emit('updateData', cityData.value)
    })
    .catch(() => {
      cityData.value.image = createURL('error')
      emit('updateData', cityData.value)
    })
  }
  
  const getPollution = () => {
    pollutionAPI.getPollution(props.city)
    .then(async (response) => {
      if(response.data.status.toLocaleLowerCase() == 'ok') {
        cityData.value.pollution = await { ...new pollutionModel(response.data.data).shrunkenAdapter() }
        emit('updateData', cityData.value)
      }
    })
  }
</script>

<template>
  <v-card
    color="rgba(1, 103, 216, 0.15)"
    variant="flat"
    rounded="lg"
    style="border: 1.5px solid #0167D8;"
    min-height="155"
  >
    <div class="d-flex flex-no-wrap justify-start mb-0">
      <!-- city image -->
      <v-avatar
        class="ma-3"
        size="127"
        rounded="lg"
        style="border: 1px solid white;"
      >
        <v-img 
          :src="props.data?.image || createURL('default-favorite')" 
          :alt="`${props.data?.weather?.name} image`" 
          gradient="to bottom, rgba(1, 103, 216, 0.0), rgba(1, 103, 216, 0.3)"
          cover
        />
      </v-avatar>
      <!-- bas data -->
      <div>
        <v-card-title class="pt-5">
          <span class="text-h6 font-weight-bold text-primary" v-html="data?.weather?.location || capitalizeFirstLetters(city)" />
        </v-card-title>
        <!-- weather & pollution -->
        <v-card-text class="ma-0">
          <!-- weather -->
          <v-row v-if="data.hasOwnProperty('weather')" class="ma-0 pa-0" align="start" justify="start" dense>
            <v-col class="ma-0 pa-0" cols="12">
              <!-- icon & description -->
              <v-avatar size="48" class="mt-n1 me-n2">
                <v-img :src="data?.weather?.icon" alt="Cloud Logo" />
                <v-tooltip
                  activator="parent"
                  location="end"
                  width="250"
                >
                  <span class="text-subtitle-2 font-weight-bold d-block">{{ $t('WEATHER_TOOLTIP') }}</span>
                  <span class="text-caption font-weight-bold d-block ms-2">{{ data?.weather?.main }} - {{ data?.weather?.description }}</span>
                  <span class="text-caption d-block ms-2">
                    The air temperature will be {{ data?.weather?.temp?.feels_like }}°C feels like, the maximum will be {{ data?.weather?.temp?.temp_max }}°C and the minimum will be {{ data?.weather?.temp?.temp_min }}°C.
                  </span>
                </v-tooltip>
              </v-avatar>
              <!-- temp -->
              <span class="text-h6 ms-3">
                {{ data?.weather?.temp?.temp }}°C
              </span>
              <!-- main -->
              <span class="text-subtitle-2 font-weight-medium ms-1">
                ({{ data?.weather?.main }})
              </span>
            </v-col>
          </v-row>
          <!-- pollution -->
          <v-row v-if="data.hasOwnProperty('pollution')" class="ma-0 pa-0" align="start" justify="start" dense>
            <v-col class="ma-0 pa-0" cols="12">
              <!-- icon & description -->
              <v-tooltip
                location="end"
                width="250"
              >
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" class="mt-n2 mx-2" size="28" :color="data?.pollution?.description.color">
                    {{ data?.pollution?.description.icon }}
                  </v-icon>
                </template>
                <div>
                  <span class="text-subtitle-2 font-weight-bold d-block">{{ $t('POLLUTION_LEVEL_TOOLTIP') }}</span>
                  <span class="text-caption font-weight-bold d-block ms-2">{{ $t(data?.pollution?.level ?? '') }}</span>
                  <span class="text-caption d-block ms-2">
                    {{ $t(data?.pollution?.description?.desc || '') }}
                  </span>
                </div>
              </v-tooltip>
              <!-- AQI -->
              <span class="text-h6 font-weight-medium ms-3">
                {{ data?.pollution?.aqi }}
              </span>
              <!-- level -->
              <span class="text-subtitle-2 font-weight-medium ms-1">
                ({{ $t(data?.pollution?.level ?? '') }})
              </span>
              </v-col>
          </v-row>
        </v-card-text>
      </div>
    </div>
    <!-- actions -->
    <v-card-actions class="my-0 py-0">
      <span 
        v-if="data.date"
        class="text-caption font-weight-medium" 
        v-html="`Updated on <span class='font-weight-bold'>${localTime(data.date)}</span>`" 
      />
      <v-spacer />

      <!-- extensive data -->
      <v-btn density="compact" icon color="primary">
        <v-icon size="small">mdi-open-in-new</v-icon>
        <v-tooltip
          activator="parent"
          location="start"
        >
          <span class="text-caption" v-text="'See extensive data'" />
        </v-tooltip>
      </v-btn>
      <!-- update data -->
      <v-btn density="compact" icon color="success">
        <v-icon size="small">mdi-update</v-icon>
        <v-tooltip
          activator="parent"
          location="start"
        >
          <span class="text-caption" v-text="'Update the data'" />
        </v-tooltip>
      </v-btn>


      <!-- remove favorite -->
      <v-btn density="compact" icon color="error">
        <v-icon size="small">mdi-heart</v-icon>
        <v-tooltip
          activator="parent"
          location="start"
        >
          <span class="text-caption" v-text="'Removal from the list of favorite cities'" />
        </v-tooltip>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>