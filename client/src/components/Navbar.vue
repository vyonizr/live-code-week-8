<template>
  <v-toolbar app dark class="grey darken-3">
    <router-link to="/" style="text-decoration: none; color: inherit;">
      <v-toolbar-title class="headline text-uppercase mx-3">
          <span>Nasa</span>
          <span class="font-weight-light">APOD</span>
      </v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="this.$store.state.isLoggedIn === false" class="hidden-sm-and-down">
      <v-btn
        :ripple="false"
        to="/users/login"
        flat
      >
        <span>Login</span>
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-else>
      <v-btn
        v-if="this.$store.state.token !== null"
        :ripple="false"
        @click="logout()"
        flat
      >
        <span>Logout</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout")
    }
  }
}
</script>

<style>
.no-style{
  text-decoration: none;
  color: inherit;
}
</style>