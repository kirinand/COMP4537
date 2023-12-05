<template>
  <v-container>
    <v-col>
      <v-row>
        <v-text-field
          v-model="imageUrl"
          :label="constants.ImageUrl"
          variant="underlined"
        ></v-text-field>
        <v-btn
          class="align-self-end mb-p22"
          rounded="0"
          color="pink"
          variant="tonal"
          @click="convertImage"
          >{{ constants.Convert }}</v-btn
        >
      </v-row>
    </v-col>
    <Spinner v-if="loading"></Spinner>
    <v-col v-else-if="text" class="pa-0">
      <div>{{ constants.ConvertedText }}</div>
      <div>{{ text }}</div>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios"
import constants from "@/constants"
import { API_URL } from "@/config"
import Spinner from "@/components/Spinner.vue"
import { useAppStore } from '@/store/app'

export default {
  components: {
    Spinner,
  },
  data: () => ({
    constants,
    imageUrl: "",
    text: "",
    loading: false,
  }),
  methods: {
    async convertImage() {
      const imgUrl = this.imageUrl

      if (!imgUrl) {
        this.$root.vtoast.show(constants.msg.InvalidImgUrl)
        return
      }

      this.loading = true
      axios.post(
        `${API_URL}/convert_handwritten`,
        { imgUrl },
        { withCredentials: true }
      )
      .then(response => {
        const { text: { message } = {}, warning } = response.data
        this.text = message
        if (warning) {
          useAppStore().setUser({ warning })
          this.$root.vtoast.show(warning)
        }
        console.log(response.data)
      })
      .catch(error => {
        this.$root.vtoast.show(constants.msg.ConvertImgFail.replace('{0}', imgUrl))
        console.log(error)
      })
      .finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style scoped>
@import "@/styles/styles.scss";
</style>
