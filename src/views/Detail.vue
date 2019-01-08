<template>
  <div class="details">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
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
      store.dispatch('ADD_REVIEW', [this.details, e])
    }
  },
  computed: {
    details() {
      const books = store.getters.getAllBooks
      const id = this.$route.params.id
      return books.filter(book => book.id === id)[0]
    },
    reviews() {
      if (this.details) {
        let reviewsList = this.details.reviews
        if (reviewsList) {
          return Object.keys(reviewsList).map(key => reviewsList[key])
        }
      }
      return []
    }
  }
}
</script>
