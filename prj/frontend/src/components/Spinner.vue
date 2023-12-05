<template>
  <v-container fluid fill-height :class="spinnerClass">
    <v-col class="text-center">
      <v-progress-circular
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-container>
</template>

<script setup>
  import { computed } from '@vue/reactivity'

  const props = defineProps({
    type: String
  })

  const spinnerClass = computed(() => {
    return props.type === 'global' ? 'global-spinner' : ''
  })
</script>

<style scoped>
  .global-spinner {
    height: 100vh;
    display: flex;
    align-items: center;
  }
</style>