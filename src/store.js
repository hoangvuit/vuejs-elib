import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var database = window.firebase.database()
var ref = database.ref()
export default new Vuex.Store({
  state: {
    fetching: true,
    books: [],
    reviews: []
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.fetching = loading
    },
    SET_BOOKS(state, books) {
      state.books = Object.keys(books).map(key => books[key])
    },
    SET_REVIEWS(state, reviews) {
      state.reviews = Object.keys(reviews).map(key => reviews[key])
    }
  },
  actions: {
    ADD_BOOK(context, book) {
      let booksRef = ref.child('books/' + book.id)
      booksRef.set(book).then(console.log('Book added'))
    },
    GET_ALL_BOOKS(context) {
      ref.child('books/').on('value', function(snap) {
        context.commit('SET_BOOKS', snap.val())
        context.commit('SET_LOADING', false)
      })
    },
    ADD_REVIEW(context, params) {
      const bookDetails = params[0]
      const review = params[1]
      const bookRef = ref.child(
        `books/${bookDetails.id}/reviews/${Date.now().toString()}`
      )
      bookRef.set(review).then()
    },
    GET_REVIEWS(context, id) {
      const bookRef = ref.child(`books/${id}/reviews`)
      bookRef.on('value', function(snap) {
        if (snap.exists()) {
          context.commit('SET_REVIEWS', snap.val())
        }
      })
    }
  },
  getters: {
    getAllBooks: state => state.books,
    getReviewsOrderByDesc: state => state.reviews.reverse()
  }
})
