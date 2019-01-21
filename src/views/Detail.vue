<template>
  <div class="details">
    <div :class="showInfoBar ? 'book-info-bar show' : 'book-info-bar'">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <BookDetails v-if="details" :details="details"/>
          </div>
          <div class="col-md-4">
            <div v-if="!isOutOfStock">
              <a href="#" class="button" @click.prevent="borrow" v-if="!isBorrowedByMe">Borrow</a>
              <a href="#" class="button return-book" @click.prevent="returnBook" v-else>Return</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div v-if="!isOutOfStock" class="borrow-btn-container">
            <a
              href="#"
              class="button"
              @click.prevent="borrow"
              v-if="!isBorrowedByMe"
            >Borrow this book</a>
            <a
              href="#"
              class="button return-book"
              @click.prevent="returnBook"
              v-else
            >Return this book</a>
          </div>
          <p v-else class="oos-note">
            We only have
            <span>{{ copies }} {{ copies > 1 ? 'copies' : 'copy'}}</span>
            of this book.
            <span v-html="borrowers">{{ borrowers }}</span> is borrowing this book.
          </p>
          <BookDetails v-if="details" :details="details"/>
          <div class="row mt-5">
            <div class="col-12">
              <Review v-once @add-review="addReview" title="Submit your review" hide="list"/>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <Review v-if="reviews" title="Reviews" :reviews="reviews" hide="form"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BookDetails from '@/components/BookDetails'
import Review from '@/components/Review'
import store from '../store'

export default {
  components: { BookDetails, Review },
  methods: {
    addReview: function(e) {
      const review = e
      store.dispatch('ADD_REVIEW', { bookId: this.bookId, review })
    },
    handleScroll: function() {
      const headerH = 104
      if (window.scrollY > headerH) {
        this.showInfoBar = true
      } else {
        this.showInfoBar = false
      }
    },
    borrow() {
      store.dispatch('BORROW_BOOK', { userId: this.userId, isbn: this.isbn })
    },
    returnBook() {
      const borrowId = this.currentBorrowId
      store.dispatch('RETURN_BOOK', borrowId)
    }
  },
  data() {
    return {
      showInfoBar: false
    }
  },
  computed: {
    details() {
      return store.getters.getCurrentBookInfo
    },
    copies() {
      return this.details.copies
    },
    bookId() {
      return this.details._id
    },
    isbn() {
      return this.$route.params.id
    },
    userId() {
      return store.getters.getUserId
    },
    reviews() {
      return store.getters.getReviews
    },
    isBorrowedByMe() {
      return store.getters.getMyBorrowedBooks.includes(this.isbn)
    },
    currentBorrowId() {
      const myBorrows = store.getters.getMyBorrows
      let borrowId = null
      myBorrows.forEach(b => {
        if (b.isbn === this.isbn) {
          borrowId = b._id
        }
      })
      return borrowId
    },
    borrowers() {
      const borrowers = store.getters.getCurrentBorrowers
      return borrowers.map(b => `<span>${b}</span>`).join(', ')
    },
    isOutOfStock() {
      return (
        store.getters.getCurrentBorrowers.length >= this.copies &&
        !this.isBorrowedByMe
      )
    }
  },
  beforeCreate() {
    store.dispatch('AUTHENTICATE')
    if (store.getters.isSignedIn) {
      store.dispatch('GET_CURRENT_ISBN', this.$route.params.id)
      store.dispatch('GET_BORROWED_BOOKS')
      store.dispatch('GET_REVIEWS')
      store.dispatch('GET_CURRENT_BORROWERS')
    } else {
      this.$router.push('/login')
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {},
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss">
.oos-note {
  color: #68b689;
  span {
    font-weight: bold;
  }
}
.details {
  .button {
    position: absolute;
    top: -55px;
    &.return-book {
      background-color: #64b587;
      &:hover {
        border-color: #64b587;
        color: #64b587;
        background-color: #fff;
      }
    }
  }
  .borrow-btn-container {
    position: relative;
  }
  .book-info-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999999;
    background-color: #fff;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    transform: translateY(-110px);
    transition: all 0.3s;
    &.show {
      transform: translateY(0);
    }
    h2 {
      font-size: 18px;
      margin-bottom: 0;
    }
    .description {
      display: none;
    }
    .button {
      width: 150px;
      max-width: 150px;
      text-align: center;
      float: right;
      position: static;
      margin-top: 5px;
    }
  }
}
</style>
