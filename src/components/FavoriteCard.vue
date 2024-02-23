<script setup lang="ts">
import type { FavData } from '@/types/favorites'
import { createURL } from '@/utils/createURL'
import { capitalizeFirstLetters } from '@/utils/capitalize'

  interface Props {
    data: FavData
    city: string
  }
  const props = defineProps<Props>()
</script>

<template>
  <!-- :color="`${theme.themes.value.light.colors.primary}30`" -->
  <!-- color="#44465580" -->
  <v-card
    color="#ecf0f1"
    variant="flat"
    rounded="lg"
    style="border: 2px solid #0167D8;"
  >
    <div class="d-flex flex-no-wrap justify-start">
      <v-avatar
        class="ma-3"
        size="125"
        rounded="lg"
        style="border: 1px solid white;"
      >
        <v-img 
          :src="props.data?.image || createURL('default-favorite')" 
          :alt="`${props.data?.weather?.name} image`" 
          gradient="to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)"
          cover
        />
      </v-avatar>
      <div>
        <v-card-title class="pt-5">
          <span class="text-h6 font-weight-bold text-primary" v-html="capitalizeFirstLetters(city)" />
        </v-card-title>

        <v-card-text class="ma-0">
          <!-- {{ data }} -->
          <div v-if="data.hasOwnProperty('weather')" style="border: 2px solid green">
            <!-- icon & description -->
            <v-avatar size="60" class="mt-n3 me-n2">
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
            <span class="text-h4">
              {{ data?.weather?.temp?.temp }}°C
            </span>
          </div>
          




            <!-- weather -->
            
            <!-- pollution -->
            <!-- <v-col v-if="pollution" class="ma-0 pa-0" cols="12" md="5">
              icon & description
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
              AQI
              <span class="text-h4">
                {{ pollution?.aqi }}
              </span>
            </v-col> -->
        </v-card-text>

        <!-- <v-card-actions>
          <v-btn
            class="ms-2"
            icon="mdi-play"
            variant="text"
          ></v-btn>
        </v-card-actions> -->
      </div>
    </div>
  </v-card>
  
  
  <!-- <v-row align="start" justify="start" dense>
    image
    <v-col cols="auto">
      <v-avatar size="150" rounded="0" >
        <v-img 
          :src="data?.image" ?
          :alt="`${data?.name} i?mage`" 
          gradient="to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)"
          cover
        />
      </v-avatar>
    </v-col>
    details
    <v-col align-self="start" cols="auto">
      {{ data?.locatio?n }}
      {{ data? }}
    ?</v-col>
  </v-row> -->
</template>