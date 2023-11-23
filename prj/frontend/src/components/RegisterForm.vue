<template>
  <v-sheet width="300" class="mx-auto">
    <v-form v-model="isFormValid" @submit.prevent="submitForm">
      <v-text-field
        v-model="username"
        :rules="usernameRules"
        :label="constants.Username"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :label="constants.Password"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">{{ constants.Signup }}</v-btn>
      <RouterLink to="/Login">{{ constants.AlreadyHaveAcc }}</RouterLink>  
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
      usernameRules: [
        value => !!value || constants.msg.UsernameVal,
      ],
      passwordRules: [
        value => !!value || constants.msg.PasswordVal,
        // value => value.length >= 8 || constants.msg.PasswordMinVal,
      ]
    }),

    methods: {
      async submitForm() {
        if (this.isFormValid) {
          axios.post(`${API_URL}/register`, {
            username: this.username,
            password: this.password
          })
          .then(response => {
            this.$root.vtoast.show(constants.msg.RegisterSuccess)
            this.$router.push('/login')
            console.log(response.data)
          })
          .catch(error => {
            this.$root.vtoast.show(constants.msg.RegisterFail, constants.action.Close)
            console.log(error)
          })
        }
      }
    } 
  }
</script>