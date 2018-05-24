import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listBooks: [],
    book: ''
  },
  mutations: {
    addToList (state, payload) {
      state.listBooks = payload
    },
    addBook (state, payload) {
      state.book = payload
    }
  },
  actions: {
    getAllBooks ({commit}) {
      axios.get('http://localhost:3000/books/')
        .then(result => {
          commit('addToList', result.data.result)
        })
    },
    getBook ({ commit }, id) {
      axios.get(`http://localhost:3000/books/${id}`)
        .then(result => {
          commit('addBook', result.data.result)
        })
    }
  }
})
