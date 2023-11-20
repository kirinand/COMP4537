<template>
  <LoginForm v-if="isLogin" />
  <RegisterForm v-else />
</template>

<script setup>
  import LoginForm from '@/components/LoginForm.vue'
  import RegisterForm from '@/components/RegisterForm.vue'

  defineProps({
    isLogin: Boolean
  })
</script>