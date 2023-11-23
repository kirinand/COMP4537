<template>
  <v-sheet width="300" class="mx-auto" align-center>
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
      <a href="">{{ constants.ForgotPassword }}</a>
      <v-btn type="submit" block class="mt-2">{{ constants.Login }}</v-btn>
      <RouterLink to="/register">{{ constants.DoNotHaveAcc }}</RouterLink>  
    </v-form>
  </v-sheet>
</template>

<script>
  import constants from '@/constants'
  import { setUser } from '@/store/utils'
  import { API_URL } from '@/config'
  import axios from 'axios'

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
      ]
    }),

    methods: {
      async submitForm() {
        if (this.isFormValid) {
          axios.post(`${API_URL}/login`, {
            username: this.username,
            password: this.password
          }, { withCredentials: true })
          .then(response => {
            const { role } = response.data
            setUser({ isLoggedIn: true, isAdmin: role === 'admin' })
            this.$router.push('/')
            console.log(response.data)
          })
          .catch(error => {
            this.$root.vtoast.show(constants.msg.LoginFail)
            console.log(error)
          })
        }
      }
    } 
  }
</script>