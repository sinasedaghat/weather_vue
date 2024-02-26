<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useFavoritesStore } from '@/stores/favorites';

  const route = useRoute()
  const router = useRouter()
  const favoritesStore = useFavoritesStore()
  const { hasFavorite } = storeToRefs(favoritesStore)
  const imgUrl = new URL('@/assets/images/cloud-logo.png', import.meta.url).href
</script>

<template>
  <v-layout>
    <!-- app bar -->
    <v-app-bar color="primary">
      <v-avatar class="mx-5" size="50">
        <v-img style="background-color: white;" :src="imgUrl" alt="Cloud Logo" />
      </v-avatar>
      <v-row class="ma-0 pa-0" align="center" justify="center">
        <v-col class="ma-0 pa-0 mb-n3" cols="12">
          <h1 class="text-info" style="font-family: Brush Script MT, cursive;">WP hub</h1>
        </v-col>
        <v-col class="ma-0 pa-0" cols="12">
          <small class="text-info" style="font-family: Brush Script MT, cursive; font-size: x-small;">Weather & Pollution Hub</small>
        </v-col>
      </v-row>
      <v-spacer />
      <!-- favorite route -->
      <v-btn
        v-if="route.name !== 'Favorites'"
        :disabled="!hasFavorite" 
        icon
        @click="router.push({ name: 'Favorites' })"
      >
        <v-icon>mdi-heart</v-icon>
        <v-tooltip
          activator="parent"
          location="start"
        >
          <span class="text-caption" v-text="'Favorite Cities'" />
        </v-tooltip>
      </v-btn>
      <!-- home route -->
      <v-btn
        v-if="route.name !== 'Home'"
        :disabled="!hasFavorite" 
        icon
        @click="router.push({ name: 'Home' })"
      >
        <v-icon>mdi-home</v-icon>
        <v-tooltip
          activator="parent"
          location="start"
        >
          <span class="text-caption" v-text="'Go To Home'" />
        </v-tooltip>
      </v-btn>
    </v-app-bar>
    <!-- main -->
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
