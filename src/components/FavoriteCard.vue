<script setup lang="ts">
import { useTheme, useLocale } from 'vuetify';
import type { FavData } from '@/types/favorites'
  interface Props {
    favorites: FavData
  }
  const props = defineProps<Props>()
  const theme = useTheme()
  const { t } = useLocale()
</script>

<template>
  <!-- :color="`${theme.themes.value.light.colors.primary}30`" -->
  <v-card
    color="#44465580"
    variant="flat"
    rounded="lg"
  >
    <div class="d-flex flex-no-wrap justify-start">
      <v-avatar
        class="ma-3"
        size="125"
        rounded="lg"
        style="border: 1px solid white;"
      >
        <v-img 
          :src="props.favorites.image" 
          :alt="`${props.favorites.weather.name} image`" 
          gradient="to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)"
          cover
        />
      </v-avatar>
      <div>
        <v-card-title class="pt-5">
          <span class="text-h5 text-white" v-html="props.favorites.weather.location" />
        </v-card-title>

        <v-card-text>
          <div>
            <!-- <v-chip
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
            </v-chip> -->
            <!-- icon & description
            <v-avatar size="60" class="mt-n3 me-n2">
              <v-img :src="props.favorites.weather.icon" alt="Cloud Logo" />
              <v-tooltip
                activator="parent"
                location="end"
                width="250"
              >
                <span class="text-subtitle-2 font-weight-bold d-block">{{ t('WEATHER_TOOLTIP') }}</span>
                <span class="text-caption font-weight-bold d-block ms-2">{{ props.favorites.weather.main }} - {{ props.favorites.weather.description }}</span>
                <span class="text-caption d-block ms-2">
                  The air temperature will be {{ props.favorites.weather.temp?.feels_like }}°C feels like, the maximum will be {{ props.favorites.weather.temp?.temp_max }}°C and the minimum will be {{ props.favorites.weather.temp?.temp_min }}°C.
                </span>
              </v-tooltip>
            </v-avatar>
            temp
            <span class="text-h4">
              {{ props.favorites.weather.temp?.temp }}°C
            </span> -->
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

        <v-card-actions>
          <!-- <v-btn
            class="ms-2"
            icon="mdi-play"
            variant="text"
          ></v-btn> -->
        </v-card-actions>
      </div>
    </div>
  </v-card>
  
  
  <!-- <v-row align="start" justify="start" dense>
    image
    <v-col cols="auto">
      <v-avatar size="150" rounded="0" >
        <v-img 
          :src="props.favorites.image" 
          :alt="`${props.favorites.name} image`" 
          gradient="to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)"
          cover
        />
      </v-avatar>
    </v-col>
    details
    <v-col align-self="start" cols="auto">
      {{ props.favorites.location }}
      {{ props.favorites }}
    </v-col>
  </v-row> -->
</template>