<script setup lang="ts">
import type { FavData } from '@/types/favorites'
interface Props {
  favorites: FavData
}

// const props = defineProps<Props>()
const props = defineProps<Props>()

// const props = withDefaults(defineProps<Props>(), {
//   msg: 'hello',
//   labels: () => ['one', 'two']
// })
</script>

<template>
  <h3>favorite cart</h3>
  {{ props.favorites }}
</template>