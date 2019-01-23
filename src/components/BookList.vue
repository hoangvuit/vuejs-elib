<template>
  <div class="book-list">
    <div class="row" v-if="books.length > 0">
      <div class="col-md-6 col-lg-4" v-for="book in books" :key="book._id">
        <div class="book">
          <img
            :src="book.cover ? apiServerURI + book.cover : defaultCover"
            alt
          />
          <h3>
            <router-link :to="'/detail/' + book.isbn" :key="$route.fullPath">
              {{ book.title }}
            </router-link>
          </h3>
          <p v-if="book.description">
            {{ book.description.substring(0, 100) + '...' }}
          </p>
          <p class="author">by {{ book.author }}</p>
        </div>
      </div>
    </div>
    <p v-else class="text-center">There is no any book.</p>
  </div>
</template>

<script>
import defaultCover from '@/assets/logo.png'

export default {
  data() {
    return {
      defaultCover: defaultCover,
      apiServerURI: 'https://elib-api-server.herokuapp.com'
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
