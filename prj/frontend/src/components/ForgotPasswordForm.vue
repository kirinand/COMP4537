<template>
  <v-sheet width="300" class="mx-auto">
    <v-form v-model="isFormValid" @submit.prevent="submitForm">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        :label="constants.Email"
        type="email"
        required
      ></v-text-field>
      <v-text-field
        v-model="username"
        :rules="usernameRules"
        :label="constants.Username"
        required
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">{{ constants.RequestPswdReset }}</v-btn>
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
      username: '',
      email: '',
      isFormValid: false,
      usernameRules: [
        value => !!value || constants.msg.UsernameVal,
      ],
      emailRules: [
        value => !!value || constants.msg.EmailVal,
        value => /.+@.+\..+/.test(value) || constants.msg.EmailVal,
      ],
    }),

    methods: {
      async submitForm() {
        if (this.isFormValid) {
          const appStore = useAppStore()
          appStore.setLoading(true)
          axios.post(`${API_URL}/forgot_password`, {
            username: this.username,
            email: this.email
          })
          .then(response => {
            this.$root.vtoast.show(constants.msg.ResetPswdReqSuccess.replace('{0}', this.email), constants.action.Close)
            this.$router.push('/login')
            console.log(response.data)
          })
          .catch(error => {
            this.$root.vtoast.show(constants.msg.ResetPswdReqFail, constants.action.Close)
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