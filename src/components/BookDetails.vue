<template>
  <div class="book-details">
    <div class="book">
      <h2>{{ details.title }}</h2>
      <div class="author">by {{ details.author }}</div>
      <p class="description" v-html="details.description">{{ details.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: Object
  }
}
</script>

<style lang="scss" scoped>
.book {
  h2 {
    margin-bottom: 0;
  }
  .description {
    margin-top: 20px;
  }
  .author {
    font-size: 14px;
    color: #a4a4a4;
    font-style: italic;
    margin-top: 5px;
  }
}
</style>
