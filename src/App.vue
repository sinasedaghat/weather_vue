<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-locale-provider>
    <RouterView />
  </v-locale-provider>
</template>
