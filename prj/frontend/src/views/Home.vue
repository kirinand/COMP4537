<template>
  <v-container>
    <div>{{ constants.NumAPICalls.replace('{0}', user.callsMade) }}</div>
    <div v-if="user.warning" class="text-caption text-red-lighten-1">{{ user.warning }}</div>
  </v-container>
  <ImageConvert />
</template>


<script>
  import { computed } from '@vue/reactivity'
  import constants from '@/constants'
  import { useAppStore } from '@/store/app'
  import ImageConvert from '@/components/ImageConvert.vue'

  export default {
    components: {
      ImageConvert
    },
    setup() {
      const appStore = useAppStore()
      const user = computed(() => ({
        callsMade: appStore.user.callsMade,
        warning: appStore.user.warning
      }))
      
      return {
        constants,
        user
      }
    },
  }
</script>
