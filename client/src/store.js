import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from './api/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    setLoggedIn(state) {
      state.isLoggedIn = true
    },
    setLoggedOut(state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login(context, credentials) {
      axios.post('/login', credentials)
      .then(({ data }) => {
        localStorage.setItem('token', data.accessToken)

        context.commit("setLoggedIn")

        Swal.fire({
          type: 'success',
          title: `Welcome!`,
          showConfirmButton: false,
          timer: 1000
        })

        router.push({ name: 'home' })
      })
      .catch(err => {
        console.log(err);
        let errorMessage = ''
        if (err.response.data.errors) {
          for (let key in err.response.data.errors) {
            errorMessage += err.response.data.errors[key] + '\n'
          }
        }
        Swal.fire({
          type: 'error',
          text: errorMessage,
          showConfirmButton: false,
          timer: 1000
        })
      })
    },
    logout(context) {
      localStorage.clear()
      context.commit("setLoggedOut")
      router.push({ name: 'home' })
    }
  }
})
