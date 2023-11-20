<template>
  <v-sheet width="300" class="mx-auto" align-center>
    <v-form v-model="isFormValid" @submit.prevent="submitForm">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        :label="constants.Email"
        type="email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :label="constants.Password"
        type="password"
        required
      ></v-text-field>
      <a href="">{{ constants.ForgotPassword }}</a>
      <v-btn type="submit" block class="mt-2">{{ constants.Login }}</v-btn>
      <RouterLink to="/register">{{ constants.DoNotHaveAcc }}</RouterLink>  
    </v-form>
  </v-sheet>
</template>

<script>
  import constants from '@/constants'
  import { useAppStore } from '@/store/app'

  export default {
    data: () => ({
      constants,
      email: '',
      password: '',
      isFormValid: false,
      emailRules: [
        value => !!value || constants.msg.EmailVal,
        value => /.+@.+\..+/.test(value) || constants.msg.EmailVal,
      ],
      passwordRules: [
        value => !!value || constants.msg.PasswordVal,
      ]
    }),

    methods: {
      async submitForm() {
        if (this.isFormValid) {
          useAppStore().setLoggedIn(true)
          this.$router.push('/')
        }
      }
    } 
  }
</script>