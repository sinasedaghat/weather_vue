<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { useTheme, useLocale } from 'vuetify';
const theme = useTheme()
const changeTheme = () => {
  console.log('changeTheme')
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const { current } = useLocale()
const changeLang = () => {
  // const { t, locale } = useI18n({ useScope: 'global' }
  i18n.locale.value = i18n.locale.value == 'en' ? 'fa' : 'en'
  current.value = i18n.locale.value
  console.log('changeLang', i18n.locale.value)
  console.log(' current.value',  current.value)
}


import testAPI from '@/services/test'

const callApi = () => {
  testAPI.getTemp('london')
}



</script>

<template>
   <v-row align="center" justify="center">
    <v-col>
      <div class="d-flex justify-center ga-2">
        <v-chip>
          Default
        </v-chip>
    
        <v-chip color="primary">
          Primary
        </v-chip>
    
        <v-chip color="secondary">
          Secondary
        </v-chip>
    
        <v-chip color="red">
          Red
        </v-chip>
    
        <v-chip color="green">
          Green
        </v-chip>
    
        <v-btn @click="changeLang">change Lang</v-btn>
      </div>
    </v-col>
   </v-row>
  <!-- <v-row align="center" justify="center" class="mt-5">
    <v-col cols="auto">
      
    </v-col>
    <v-col cols="auto">
      {{ $t('HI') }}
    </v-col>
  </v-row> -->
  <v-row align="center" justify="center">
    <v-col>
      <div class="d-flex justify-center ga-2 mt-2">
        <v-chip variant="flat">
          Default flat
        </v-chip>

        <v-chip variant="flat" color="primary">
          Primary flat
        </v-chip>

        <v-chip variant="flat" color="secondary">
          Secondary flat
        </v-chip>

        <v-chip variant="flat" color="red">
          Red flat
        </v-chip>

        <v-chip variant="flat" color="green">
          Green flat
        </v-chip>

        <v-btn @click="changeTheme">change theme</v-btn>
      </div>
    </v-col>  
  </v-row>


  <v-row align="center" justify="start" class="mt-5">
    <v-col cols="auto">
      {{ $t('HI') }}
    </v-col>
  </v-row>

  <v-row align="center" justify="start" class="mt-5">
    <v-col cols="auto">
      <v-btn @click="callApi">call API</v-btn>
    </v-col>
  </v-row>



</template>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
