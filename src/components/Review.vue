<template>
  <div>
    <div v-show="hide === 'form'" class="reviews-list">
      <h2>{{ title }}</h2>
      <p v-if="reviews.length === 0">There are no reviews yet.</p>
      <div class="reviews" v-else>
        <div class="review" v-for="review in reviews" :key="review.key">
          <p v-show="review.text !== ''" class="review-text">"{{ review.text }}"</p>
          <Stars :rating="review.star" :nointeract="true"/>
          <p class="reviewer-name">{{ review.reviewer }}</p>
        </div>
      </div>
    </div>
    <div v-show="hide === 'list'" class="review-form">
      <h4>{{ title }}</h4>
      <Stars v-once @rated="rated"/>
      <form @submit.prevent="addReview">
        <div class="control-group">
          <textarea v-model="reviewText" placeholder="Your review"></textarea>
        </div>
        <div class="control-group">
          <input type="submit" value="Submit">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Stars from '@/components/Stars'
export default {
  components: {
    Stars
  },
  props: {
    hide: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Reviews'
    },
    _reviewText: {
      type: String,
      default: ''
    },
    reviews: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    rated(e) {
      this.star = e
    },
    addReview() {
      var review = {
        text: this.reviewText,
        star: this.star,
        reviewer: this.reviewer
      }
      this.$emit('add-review', review)
      this.reviewText = ''
    }
  },
  data() {
    return {
      reviewText: this._reviewText,
      star: 0
    }
  },
  computed: {
    reviewer() {
      return this.$store.getters.signedInFullName
    }
  }
}
</script>

<style lang="scss" scoped>
.review {
  margin-bottom: 20px;
}
.review-text {
  margin-bottom: 0;
}
.reviewer-name {
  font-size: 14px;
  color: #a4a4a4;
  font-style: italic;
  margin-top: 5px;
}
</style>
