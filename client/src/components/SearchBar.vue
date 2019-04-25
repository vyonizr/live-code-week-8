<template>
<div>
  <v-flex xs9>
    <v-form @submit.prevent="searchPicture">
      <v-text-field
        v-model="searchInput"
        label="Search"
      ></v-text-field>
      <v-btn type="submit">
        Search
      </v-btn>
    </v-form>
  </v-flex>
</div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: ""
    }
  },
  methods: {
    searchPicture() {
      this.$emit("searchPicture", this.searchInput)
      this.searchInput = ""
    }
  }
}
</script>