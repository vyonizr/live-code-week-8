<template>
  <v-flex>
    <v-layout
      column
    >
      <div v-for="(picture, index) in filteredList" :key="index">
        <ApodItem
          :picture="picture"
          @deleteAPicture="deleteAPicture"
        />
      </div>
    </v-layout>
  </v-flex>
</template>

<script>
  import ApodItem from './ApodItem'
export default {
  props: ['filderedList'],
  components: {
    ApodItem
  },
  methods: {
    deleteAPicture() {
      this.$emit("deleteAPicture",)
    }
  }
}
</script>