<template>
  <div class="book-list">
    <div class="row">
      <div class="col-md-6 col-lg-4" v-for="book in books" :key="book._id">
        <div class="book">
          <img :src="book.cover || defaultCover" alt>
          <h3>
            <router-link :to="'/detail/' + book.isbn" :key="$route.fullPath">{{ book.title }}</router-link>
          </h3>
          <p>{{ book.description.substring(0, 100)+'...' }}</p>
          <p class="author">by {{ book.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultCover from '@/assets/logo.png'

export default {
  data() {
    return {
      defaultCover: defaultCover
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
    height: 200px;
    margin: 0 auto 20px;
    display: block;
  }
  .author {
    color: #aaa;
  }
}
</style>
