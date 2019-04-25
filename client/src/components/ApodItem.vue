<template>
  <v-flex>
    <v-card>
      <v-card-title>
        {{ picture.title }}
      </v-card-title>
      <v-card-text>
        <div v-if="picture.mediaType === 'video'">
          <iframe :src="picture.url" frameborder="0"></iframe>
        </div>
        <div v-else>
          <v-img :src="picture.url"/>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="deleteAPicture">Delete</v-btn>
        <v-btn :to="{ name: 'pictureDetails', params: { pictureId: picture._id}}">View details</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  
  props: ['picture'],
  methods: {
    deleteAPicture() {
      this.$emit("deleteAPicture", this.picture._id)
    }
  }
}
</script>
