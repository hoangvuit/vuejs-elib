<template>
  <form @submit.prevent="addBook">
    <div class="control-group">
      <input type="text" required placeholder="ISBN" v-model="id">
    </div>
    <div class="control-group">
      <input type="text" required placeholder="Title" v-model="title">
    </div>
    <div class="control-group">
      <input type="text" placeholder="Author" v-model="author">
    </div>
    <div class="control-group">
      <textarea placeholder="Description" v-model="description"></textarea>
    </div>
    <!-- <div class="control-group">
      <input type="checkbox" id="checkbox" v-model="available">
      <label for="checkbox">&nbsp; {{ status }}</label>
    </div>-->
    <div class="control-group">
      <input type="submit" val="Add">
    </div>
  </form>
</template>

<script>
export default {
  props: {
    _id: {
      type: String,
      default: ''
    },
    _title: {
      type: String,
      default: ''
    },
    _author: {
      type: String,
      default: ''
    },
    _description: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      description: this._description
    }
  },
  computed: {
    status: function() {
      return this.available ? 'Available' : 'Rented'
    }
  },
  methods: {
    addBook: function() {
      this.$store.dispatch('ADD_BOOK', this.$data)
      this.id = ''
      this.title = ''
      this.author = ''
      this.description = ''
    }
  }
}
</script>
