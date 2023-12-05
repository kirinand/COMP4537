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
      <RouterLink to="/forgot-password" class="text-btn">{{ constants.ForgotPassword }}</RouterLink>
      <v-btn type="submit" block class="mt-2">{{ constants.Login }}</v-btn>
      <RouterLink to="/register" class="text-btn">{{ constants.DoNotHaveAcc }}</RouterLink>  
    </v-form>
  </v-sheet>
</template>

<script>
  import constants from '@/constants'
  import { setUser } from '@/store/utils'
  import { API_URL } from '@/config'
  import axios from 'axios'
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
          const appStore = useAppStore()
          appStore.setLoading(true)
          axios.post(`${API_URL}/login`, {
            email: this.email,
            password: this.password
          }, { withCredentials: true })
          .then(response => {
            const { role, calls_made, warning } = response.data
            const isAdmin = role === 'admin'
            setUser({ 
              isLoggedIn: true,
              isAdmin,
              callsMade: calls_made,
              warning
            })
            if (isAdmin) {
              this.$router.push('/admin')
            } else {
              this.$router.push('/')
            }
            console.log(response.data)
          })
          .catch(error => {
            this.$root.vtoast.show(constants.msg.LoginFail)
            console.log(error)
          })
          .finally(() => {
            appStore.setLoading(false)
          })
        }
      }
    } 
  }
</script>

<style scoped>
  @import '@/styles/styles.scss';
</style>