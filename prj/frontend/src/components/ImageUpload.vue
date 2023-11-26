<template>
  <v-container>
    <v-col>
      <v-file-input 
        :label="constants.UploadImage"
        variant="underlined"
        prepend-icon="mdi-camera"
        accept="image/*"
        v-model="image"
        @change="onImageChange"
      ></v-file-input>
    </v-col>
    <v-col>
      <v-img
        v-if="imageUrl"
        :src="imageUrl"
      ></v-img>
    </v-col>
    <v-col class="d-flex justify-end">
      <v-btn
        v-if="imageUrl"
        :src="imageUrl"
      >{{ constants.Analyse }}</v-btn>
    </v-col>
  </v-container>
</template>

<script>
  import constants from '@/constants'

  export default {
    data: () => ({
      constants,
      image: undefined,
      imageUrl: ''
    }),
    methods: {
      onImageChange(e) {
        const file = e.target.files[0] || undefined

        if (file && file.type.startsWith('image/')) {
          this.imageUrl = URL.createObjectURL(file)
        }
        else {
          this.imageUrl = ''
        }
      }
    },
    watch: {
      image(val) {
        if (!val.length) {
          this.imageUrl = ''
        }
      }
    }
  }
  
</script>