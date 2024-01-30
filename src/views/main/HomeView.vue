<script setup lang="ts">
import sky from '@/assets/images/cloud-background.mp4'
</script>

<template>
  <v-container fluid style="border: 2px solid #fff;">
    <video autoplay loop muted class="video-background ">
      <source :src="sky" type="video/webm" />
      <source :src="sky" type="video/mp4" />
    </video>
    <!-- {{ $t('HI') }}
    <h2 class="text-primary">Home</h2> -->
    <!-- input card -->
    <v-card
      style="border: 2px solid #fff;"
      class="mx-auto mt-16" 
      variant="flat"
      color="#00000000"
      width="600px" 
      height="100px"
    >
      <v-card-text>
        <v-row align="center" justify="center" dense>
          <v-col cols="10">
            <v-text-field
              class="elevation-0"
              color="primary"
              variant="solo"
              :placeholder="$t('ENTER_CITY_NAME')"
              hide-details
              rounded
            />
          </v-col>
          <v-col cols="auto">
            <v-btn variant="elevated" color="white" icon>
              <v-icon color="primary">mdi-map-search</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
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
