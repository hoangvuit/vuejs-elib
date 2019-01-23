import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    fetching: true,
    adding: false,
    books: [],
    isbn: '',
    borrows: [],
    currentBorrowers: [],
    reviews: [],
    authentication: {}
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.fetching = loading
    },
    SET_ADDING(state, adding) {
      state.adding = adding
    },
    SET_BOOKS(state, books) {
      state.books = Object.keys(books).map(key => books[key])
    },
    SET_CURRENT_ISBN(state, isbn) {
      state.isbn = isbn
    },
    SET_REVIEWS(state, reviews) {
      state.reviews = Object.keys(reviews).map(key => reviews[key])
    },
    SET_AUTH_INFO(state, authObj) {
      state.authentication = authObj
    },
    SET_BORROWS(state, borrows) {
      state.borrows = borrows
    },
    SET_CURRENT_BORROWERS(state, borrows) {
      state.currentBorrowers = borrows
    }
  },
  actions: {
    ADD_BOOK(context, data) {
      context.commit('SET_ADDING', true)
      Vue.axios
        .post('/upload', data.formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          const bookData = {
            ...data.bookData,
            coverPreview: '',
            cover: response.data
          }
          Vue.axios.post('/book', bookData).then(() => {
            context.commit('SET_ADDING', false)
          })
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    ADD_REVIEW(context, data) {
      const { bookId, review } = data
      let reviews = this.state.reviews
      reviews.unshift(review)
      Vue.axios.patch(`/book/${bookId}`, { reviews: reviews }).then(() => {
        context.commit('SET_REVIEWS', reviews)
      })
    },
    ADD_USER(context, user) {
      Vue.axios.post(`/user`, user).then(() => {
        console.log('User added!')
      })
    },
    AUTHENTICATE(context, authentication) {
      let authObj = null
      if (authentication) {
        authObj = {
          isSignedIn: true,
          ...authentication.Zi,
          ...authentication.w3
        }
        localStorage.setItem('auth-obj', JSON.stringify(authObj))
      } else {
        const savedAuth = JSON.parse(localStorage.getItem('auth-obj'))
        authObj = {
          isSignedIn: savedAuth !== null ? true : false,
          ...savedAuth
        }
      }
      context.commit('SET_AUTH_INFO', authObj)
    },
    GET_ALL_BOOKS(context) {
      Vue.axios.get('/books').then(res => {
        context.commit('SET_BOOKS', res.data)
        context.commit('SET_LOADING', false)
      })
    },
    GET_REVIEWS(context) {
      Vue.axios.get(`/book/isbn/${this.state.isbn}`).then(res => {
        const reviews = res.data[0].reviews
        context.commit('SET_REVIEWS', reviews)
      })
    },
    BORROW_BOOK(context, borrow) {
      Vue.axios
        .post('/borrow', borrow)
        .then(() => {
          context.dispatch('GET_BORROWED_BOOKS')
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    RETURN_BOOK(context, borrowId) {
      Vue.axios
        .patch(`/borrow/${borrowId}`, { return: Date.now().toString() })
        .then(() => {
          context.dispatch('GET_BORROWED_BOOKS')
        })
    },
    GET_BORROWED_BOOKS(context) {
      Vue.axios.get('/borrows').then(res => {
        context.commit('SET_BORROWS', res.data)
      })
    },
    GET_CURRENT_BORROWERS(context) {
      Vue.axios.get(`/borrow/book/${this.state.isbn}`).then(res => {
        var current = []
        res.data.forEach(b => {
          // console.log(b.return)
          if (b.return === undefined || b.return === '') {
            current.push(b)
          }
        })
        context.commit('SET_CURRENT_BORROWERS', current)
      })
    },
    GET_CURRENT_ISBN(context, isbn) {
      context.commit('SET_CURRENT_ISBN', isbn)
    },
    GET_CURRENT_BOOK(context, isbn) {
      const bookInfo = this.state.books.filter(book => book.isbn === isbn)[0]
      context.commit('SET_CURRENT_BOOK', bookInfo)
    }
  },
  getters: {
    getAllBooks: state => state.books,
    getCurrentBookInfo: state =>
      state.books.filter(book => book.isbn === state.isbn)[0],
    getBorrowedBooks: state => state.borrows,
    getCurrentBorrowers: state => state.currentBorrowers,
    getMyBorrowedBooks: state => {
      const userId = state.authentication.Eea
      const borrows = state.borrows
      return borrows.map(borrow => {
        if (borrow.userId === userId && borrow.return === undefined) {
          return borrow.isbn
        }
      })
    },
    getMyBorrows: state => {
      const userId = state.authentication.Eea
      const borrows = state.borrows
      return borrows.map(borrow => {
        if (borrow.userId === userId) {
          return borrow
        }
      })
    },
    getReviews: state => state.reviews,
    getUserId: state => state.authentication.Eea,
    isSignedIn: state => state.authentication.isSignedIn,
    signedInName: state => state.authentication.ofa,
    signedInFullName: state => state.authentication.ig,
    signedInUser: state => {
      return {
        fullName: state.authentication.ig,
        name: state.authentication.ofa,
        avatar: state.authentication.Paa,
        email: state.authentication.U3,
        id: state.authentication.Eea
      }
    },
    isAdding: state => state.adding
  }
})
