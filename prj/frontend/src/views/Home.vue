<template>
  <v-container>
    <div>{{ constants.NumAPICalls.replace('{0}', user.callsMade) }}</div>
    <div v-if="user.warning" class="text-caption, warning">{{ user.warning }}</div>
  </v-container>
  <ImageUpload />
</template>


<script>
  import { computed } from '@vue/reactivity'
  import constants from '@/constants'
  import { useAppStore } from '@/store/app'
  import ImageUpload from '@/components/ImageUpload.vue'

  export default {
    components: {
      ImageUpload
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

<style scoped>
  @import '@/styles/styles.scss';
</style>
