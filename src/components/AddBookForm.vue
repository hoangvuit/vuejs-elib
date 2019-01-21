<template>
  <div class="row">
    <div class="col-md-6">
      <form @submit.prevent="addBook">
        <div class="control-group">
          <input type="text" name="title" required placeholder="Title" v-model="title">
        </div>
        <div class="row">
          <div class="col-6">
            <div class="control-group">
              <input type="text" name="isbn" required placeholder="ISBN" v-model="isbn">
            </div>
            <div class="control-group">
              <input type="text" name="author" placeholder="Author" v-model="author">
            </div>
          </div>
          <div class="col-6">
            <div class="control-group">
              <div class="drop-zone">
                <input type="file" name="cover" @change="dragndropHandler">
                <p>{{ this.coverName || 'Drag & drop cover here.'}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="control-group">
              <input type="text" name="publisher" placeholder="Publisher" v-model="publisher">
            </div>
          </div>
          <div class="col-md-6">
            <div class="control-group">
              <input type="text" name="copies" placeholder="Number of hard copies" v-model="copies">
            </div>
          </div>
        </div>
        <div class="control-group">
          <textarea placeholder="Description" name="description" v-model="description"></textarea>
        </div>
        <!-- <div class="control-group">
      <input type="checkbox" id="checkbox" v-model="available">
      <label for="checkbox">&nbsp; {{ status }}</label>
        </div>-->
        <div class="control-group">
          <input type="submit" val="Add">
        </div>
      </form>
    </div>
    <div class="col-md-6 d-none d-md-block">
      <div class="cover-preview">
        <img :src="this.coverPreview" alt>
      </div>
    </div>
  </div>
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
      isbn: this._id,
      title: this._title,
      author: this._author,
      description: this._description,
      publisher: '',
      copies: '',
      cover: '',
      coverName: '',
      coverPreview: ''
    }
  },

  methods: {
    dragndropHandler(e) {
      const input = e.target
      if (input.files && input.files[0]) {
        this.coverName = input.files[0].name
        var reader = new FileReader()

        reader.onload = eve => {
          this.coverPreview = eve.target.result.toString()
        }

        reader.readAsDataURL(input.files[0])
      }
    },
    addBook: function(e) {
      const formData = new FormData(e.target)
      const bookData = this.$data
      this.$store.dispatch('ADD_BOOK', { formData, bookData })
      this.id = ''
      this.title = ''
      this.author = ''
      this.description = ''
      this.cover = {}
      this.publisher = ''
      this.copies = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-preview {
  img {
    max-width: 100%;
  }
}
</style>
