<template>
  <v-snackbar
    v-model="isVisible"
    color="white"
    timeout="5000"
  >
    {{ text }}

    <template v-slot:actions>
      <v-btn
        color="pink"
        variant="text"
        @click="isVisible = false"
      >
        {{ action }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  import constants from '@/constants'

  export default {
    name: 'vtoast',
    data: () => ({
      isVisible: false,
      text: '',
      action: '',
    }),
    methods: {
      show(message, action=constants.action.Close) {
        this.text = message
        this.action = action
        this.isVisible = true
      }
    }
  }
</script>