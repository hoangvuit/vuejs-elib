<template>
  <div class="book-list">
    <div class="row">
      <div class="col-md-6 col-lg-4" v-for="book in books" :key="book.id">
        <div class="book">
          <img :src="defaultReviewImage" alt>
          <h3>
            <router-link :to="'/detail/' + book.id" :key="$route.fullPath">{{ book.title }}</router-link>
          </h3>
          <p>{{ book.description.substring(0, 100)+'...' }}</p>
          <p class="author">by {{ book.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultReviewImage from '@/assets/logo.png'

export default {
  data() {
    return {
      defaultReviewImage: defaultReviewImage
    }
  },
  computed: {
    books() {
      return this.$store.getters.getAllBooks
    }
  }
}
</script>

<style lang="scss" scoped>
.book {
  img {
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
    display: block;
  }
  .author {
    color: #aaa;
  }
}
</style>
