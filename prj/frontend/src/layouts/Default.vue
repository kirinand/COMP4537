<template>
  <v-app>
    <app-bar />
    <Spinner v-if="loading" type="global"></Spinner>
    <app-view v-else />
  </v-app>
</template>

<script setup>
  import { computed } from '@vue/reactivity'
  import AppBar from './AppBar.vue'
  import AppView from './View.vue'
  import Spinner from '@/components/Spinner.vue'
  import { useAppStore } from '@/store/app'

  const appStore = useAppStore()
  const loading = computed(() => appStore.loading)
</script>
