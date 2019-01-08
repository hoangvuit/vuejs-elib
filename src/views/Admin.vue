<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Admin</h1>
        <div class="row">
          <div class="col-md-6">
            <AddBookForm/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddBookForm from '@/components/AddBookForm'
export default {
  name: 'Admin',
  components: { AddBookForm }
}
</script>

<style>
</style>
