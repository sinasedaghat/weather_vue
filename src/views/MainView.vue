<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { RouterView } from 'vue-router';
import { useDisplay } from 'vuetify';
  const drawer: Ref<boolean> = ref(false)


  const display = useDisplay()
  
</script>

<template>
  <v-layout>
    <!-- app bar -->
    <v-app-bar>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- side bar -->
    <v-navigation-drawer v-model="drawer" bottom>
      <v-list :items="[{title: 'foo', value: 'Foo'}]"></v-list>
    </v-navigation-drawer>
    <!-- main -->
    <v-main>
      <RouterView />
      {{ display.mobile }}
    </v-main>
  </v-layout>
</template>
