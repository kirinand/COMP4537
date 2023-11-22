<template>
  <router-view />
  <vtoast ref="vtoast" />
</template>

<script>
  import vtoast from "@/components/Toast.vue"
  
  export default {
    name: 'App',
    components: {
      vtoast
    },
    mounted() {
      this.$root.vtoast = this.$refs.vtoast
    }
  }
</script>
