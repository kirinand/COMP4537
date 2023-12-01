<template>
  <LoginForm v-if="type==='login'" />
  <RegisterForm v-else-if="type==='register'" />
  <ForgotPasswordForm v-else-if="type==='forgot'" />
  <ResetPasswordForm v-else-if="type==='reset'" />
</template>

<script setup>
  import LoginForm from '@/components/LoginForm.vue'
  import RegisterForm from '@/components/RegisterForm.vue'
  import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue'
  import ResetPasswordForm from '@/components/ResetPasswordForm.vue'

  defineProps({
    type: String
  })
</script>