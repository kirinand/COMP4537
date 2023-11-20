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
        v-model="password"
        :rules="passwordRules"
        :label="constants.Password"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">Signup</v-btn>
      <RouterLink to="/Login">{{ constants.AlreadyHaveAcc }}</RouterLink>  
    </v-form>
  </v-sheet>
</template>

<script>
  import constants from '@/constants'

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
        value => value.length >= 8 || constants.msg.PasswordMinVal,
      ]
    }),

    methods: {
      async submitForm() {
        if (this.isFormValid) {
          this.$router.push('/Login')
        }
      }
    } 
  }
</script>