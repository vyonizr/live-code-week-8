<template>
  <div>
    <div v-if="this.$store.state.isLoggedIn === false">
      <Welcome/>
    </div>
    <div v-else>
      <Dashboard
        :pictures="pictures"
        @createAPicture="createAPicture"
        @deleteAPicture="deleteAPicture"
      />
    </div>
  </div>
</template>

<script>
  import Welcome from '../components/Welcome'
  import Dashboard from '../components/Dashboard'
  import axios from '../api/axios'

  export default {
    data() {
      return {
        pictures: []
      }
    },
    components: {
      Welcome,
      Dashboard
    },
    created() {
      this.getAllPictures()
    },
    methods: {
      getAllPictures() {
        axios.get("/apods", {
          headers: {
            'access-token': localStorage.getItem("token")
          }
        })
        .then(({ data  }) => {
          this.pictures = data
        })
      },
      createAPicture(date) {
        axios.post("/apods", {
          date
        }, {
          headers: {
            'access-token': localStorage.getItem("token")
          }
        })
        .then(({ data }) => [
          this.pictures.push(data)
        ])
        .catch(err => {
          console.log(err);
        })
      },
      deleteAPicture(pictureId) {
        axios.delete(`/apods/${pictureId}`, {
          headers: {
            'access-token': localStorage.getItem("token")
          }
        })
        .then(() => {
          let deletedPictureIndex = this.pictures.findIndex(picture => picture._id === pictureId)
          this.pictures.splice(deletedPictureIndex, 1)
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
