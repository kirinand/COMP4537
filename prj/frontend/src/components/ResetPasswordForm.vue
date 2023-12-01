<template>
  <v-sheet width="300" class="mx-auto">
    <v-form v-model="isFormValid" @submit.prevent="submitForm">
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :label="constants.Password"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">{{ constants.ResetPassword }}</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
  import axios from 'axios'
  import constants from '@/constants'
  import { API_URL } from '@/config'

  export default {
    data: () => ({
      constants,
      username: '',
      password: '',
      isFormValid: false,
      passwordRules: [
        value => !!value || constants.msg.PasswordVal,
      ]
    }),

    methods: {
      async submitForm() {
        if (this.isFormValid) {
          // axios.post(`${API_URL}/register`, {
          //   username: this.username,
          //   password: this.password
          // })
          // .then(response => {
            this.$root.vtoast.show(constants.msg.ResetPswdReqSuccess)
            this.$router.push('/login')
          //   console.log(response.data)
          // })
          // .catch(error => {
          //   this.$root.vtoast.show(constants.msg.RegisterFail, constants.action.Close)
          //   console.log(error)
          // })
        }
      }
    } 
  }
</script>

<style scoped>
  @import '@/styles/styles.scss';
</style>