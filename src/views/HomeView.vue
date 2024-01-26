<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
const url = import.meta.env.VITE_WEATHER_BASE_URL
console.log(url)
</script>

<template>
  <main>
    {{ $t('HI') }}
  </main>
</template>
