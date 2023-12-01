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
    <v-col class="pa-0">
      <div>{{ constants.ConvertedText }}</div>
      <div>{{ text }}</div>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios"
import constants from "@/constants"
import { API_URL } from "@/config"

export default {
  data: () => ({
    constants,
    imageUrl: "",
    text: "",
  }),
  methods: {
    async convertImage() {
      const imgUrl = this.imageUrl
      axios.post(
        `${API_URL}/convert_handwritten`,
        { imgUrl },
        { withCredentials: true }
      )
      .then(response => {
        // this.text = response.data.text
        console.log(response.data)
      })
      .catch(error => {
        this.$root.vtoast.show(constants.msg.ConvertImgFail.replace('{0}', imgUrl))
        console.log(error)
      })
    },
  },
}
</script>

<style scoped>
@import "@/styles/styles.scss";
</style>
