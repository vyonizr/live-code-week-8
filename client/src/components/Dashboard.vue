<template>
  <v-container>
    <v-layout
      text-xs-center
      column
      wrap
    >
    <!-- ADD APOD FORM -->
      <v-flex xs12>
        <AddApodForm
          @createAPicture="createAPicture"
        />
      </v-flex>
      <v-flex xs12>
        <v-layout
          row
          wrap
        >
          <v-flex xs6>
            <v-layout
              column
            >
              <v-flex>
                <v-layout
                  row
                  wrap
                >
               <v-flex xs12>
                  <SearchBar
                    @searchPicture="searchPicture"
                  />
               </v-flex>
                </v-layout>
              </v-flex>
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
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import datepicker from 'vuejs-datepicker';
  import ApodItem from './ApodItem'
  import AddApodForm from './AddApodForm'
  import SearchBar from './SearchBar'

  export default {
    props: ['pictures'],
    data() {
      return {
        searchInput: ""
      }
    },
    components: {
      datepicker,
      ApodItem,
      AddApodForm,
      SearchBar
    },
    computed: {
      filteredList() {
        let self = this
        if(this.searchInput !== "") {
          return self.pictures.filter(picture => picture.title.toLowerCase() === this.searchInput.toLowerCase())
        }
        else return this.pictures
      }
    },
    methods: {
      createAPicture(dateInput) {
        this.$emit("createAPicture", dateInput)
      },
      deleteAPicture(pictureId) {
        this.$emit("deleteAPicture", pictureId)
      },
      searchPicture(searchInput) {
        this.searchInput = searchInput
      }
    }
  }
</script>
