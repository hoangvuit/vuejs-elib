<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Admin</h1>
        <AddBookForm/>
      </div>
    </div>
  </div>
</template>

<script>
import AddBookForm from '@/components/AddBookForm'
export default {
  name: 'Admin',
  components: { AddBookForm },
  mounted: function() {
    this.$store.dispatch('AUTHENTICATE')
    if (!this.$store.getters.isSignedIn) {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
