<template>
  HOME
  <v-btn
    v-if="isAdmin"
    @click="console.log('admin')"
  >
    Admin Console
  </v-btn>
</template>

<script setup>
  import { getUser } from '@/store/utils'

  const { isAdmin } = getUser()
</script>
