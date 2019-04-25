<template>
  <v-form
    @submit.prevent="createAPicture"
  >
    <input type="date" v-model="dateInput"/>
    <v-btn
      type="submit"
    >
      Submit
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      dateInput: ""
    }
  },
  methods: {
    createAPicture() {
      this.$emit("createAPicture", this.dateInput)
    }
  }
}
</script>