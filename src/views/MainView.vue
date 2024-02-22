<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useFavoritesStore } from '@/stores/favorites';

  const favoritesStore = useFavoritesStore()
  const { hasFavorite } = storeToRefs(favoritesStore)
  const router = useRouter()
  const imgUrl = new URL('@/assets/images/cloud-logo.png', import.meta.url).href
</script>

<template>
  <v-layout>
    <!-- app bar -->
    <v-app-bar color="primary">
      <v-avatar @click="router.push({ name: 'Home' })" class="mx-5" size="50">
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
      <v-btn :disabled="!hasFavorite" @click="router.push({ name: 'Favorites' })" icon >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- main -->
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
