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
  import { useAppStore } from '@/store/app'

  export default {
    data: () => ({
      constants,
      password: '',
      isFormValid: false,
      token: '',
      passwordRules: [
        value => !!value || constants.msg.PasswordVal,
        value => value.length >= 8 || constants.msg.PasswordMinVal,
      ]
    }),

    methods: {
      async submitForm() {
        const appStore = useAppStore()
        appStore.setLoading(true)
        if (this.isFormValid) {
          axios.patch(`${API_URL}/reset_password`, {
            token: this.token,
            password: this.password
          })
          .then(response => {
            this.$root.vtoast.show(constants.msg.ResetPswdSuccess)
            this.$router.push('/login')
            console.log(response.data)
          })
          .catch(error => {
            this.$root.vtoast.show(constants.msg.RegisterFail, constants.action.Close)
            console.log(error)
          })
          .finally(() => {
            appStore.setLoading(false)
          })
        }
      }
    },

    mounted() {
      const { token } = this.$route.query
      if (!token) {
        this.$router.push('/login')
      }
      this.token = token
    }
  }
</script>

<style scoped>
  @import '@/styles/styles.scss';
</style>