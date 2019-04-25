<template>
  <v-app>
    <Navbar/>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Welcome,
    Navbar
  },
  data () {
    return {
      //
    }
  },
  created() {
    this.refreshCheckLogin()
  },
  methods: {
    refreshCheckLogin() {
      if (localStorage.getItem("token")) {
        this.$store.commit("setLoggedIn")
      }
    }
  }
}
</script>
