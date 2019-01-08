<template>
  <div class="book-details">
    <div class="book">
      <h2>{{ details.title }}</h2>
      <p>{{ details.description }}</p>
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

<style>
</style>
