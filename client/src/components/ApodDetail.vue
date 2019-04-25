<template>
  <v-card>
    <v-card-title>
      {{ picture.title }}
    </v-card-title>
    <v-card-text>
      {{ picture.desc }}
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      {{ picture.date }}
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from '../api/axios'

export default {
  data() {
    return {
      picture: {}
    }
  },
  created() {
    this.getPictureDetails()
  },
  watch: {
    $route (newVal) {
      this.getPictureDetailsOnChange(newVal.params.pictureId)
    }
  },
  methods: {
    getPictureDetails() {
      axios.get(`/apods/${this.$route.params.pictureId}`, {
        headers: {
          'access-token': localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        this.picture = data
      })
    },
    getPictureDetailsOnChange(newParams) {
      axios.get(`/apods/${newParams}`, {
        headers: {
          'access-token': localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        this.picture = data
      })
    }
  }
}
</script>