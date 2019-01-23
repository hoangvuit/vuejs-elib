<template>
  <div class="div">
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="addBook">
          <div class="control-group">
            <input
              type="text"
              name="title"
              required
              placeholder="Title"
              v-model="title"
            />
          </div>
          <div class="row">
            <div class="col-6">
              <div class="control-group">
                <input
                  type="text"
                  name="isbn"
                  required
                  placeholder="ISBN"
                  v-model="isbn"
                />
              </div>
              <div class="control-group">
                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  v-model="author"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="control-group">
                <div class="drop-zone">
                  <input type="file" name="cover" @change="dragndropHandler" />
                  <p>{{ this.coverName || 'Drag & drop cover here.' }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="control-group">
                <input
                  type="text"
                  name="publisher"
                  placeholder="Publisher"
                  v-model="publisher"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="control-group">
                <input
                  type="text"
                  name="copies"
                  placeholder="Number of hard copies"
                  v-model="copies"
                />
              </div>
            </div>
          </div>
          <div class="control-group">
            <textarea
              placeholder="Description"
              name="description"
              v-model="description"
            ></textarea>
          </div>
          <!-- <div class="control-group">
      <input type="checkbox" id="checkbox" v-model="available">
      <label for="checkbox">&nbsp; {{ status }}</label>
          </div>-->
          <div class="control-group"><input type="submit" val="Add" /></div>
        </form>
      </div>
      <div class="col-md-6 d-none d-md-block">
        <div class="cover-preview"><img :src="this.coverPreview" alt /></div>
      </div>
    </div>
    <div v-if="isAdding" class="overlay">
      <div class="loader book">
        <figure class="page"></figure>
        <figure class="page"></figure>
        <figure class="page"></figure>
      </div>
      <p>Please wait</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isbn: '',
      title: '',
      author: '',
      description: '',
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
    }
  },
  computed: {
    isAdding() {
      return this.$store.getters.isAdding
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  p {
    color: #ffffff;
    text-align: center;
    font-family: sans-serif;
    text-transform: uppercase;
    font-size: 20px;
    position: relative;
    &:after {
      position: absolute;
      content: '';
      -webkit-animation: Dots 2s cubic-bezier(0, 0.39, 1, 0.68) infinite;
      animation: Dots 2s cubic-bezier(0, 0.39, 1, 0.68) infinite;
    }
  }
}

.loader {
  margin: 42vh auto 30px;
}

.book {
  border: 4px solid #ffffff;
  width: 60px;
  height: 45px;
  position: relative;
  perspective: 150px;
  background: #2f3e4e;
  transform: scale(1.5);
}

.page {
  display: block;
  width: 30px;
  height: 45px;
  border: 4px solid #ffffff;
  border-left: 1px solid #2f3e4e;
  margin: 0;
  position: absolute;
  right: -4px;
  top: -4px;
  overflow: hidden;
  background: #2f3e4e;
  transform-style: preserve-3d;
  -webkit-transform-origin: left center;
  transform-origin: left center;
}

.book .page:nth-child(1) {
  -webkit-animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.6s infinite;
  animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.6s infinite;
}

.book .page:nth-child(2) {
  -webkit-animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.45s infinite;
  animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.45s infinite;
}

.book .page:nth-child(3) {
  -webkit-animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.2s infinite;
  animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.2s infinite;
}

/* Page turn */

@-webkit-keyframes pageTurn {
  0% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  20% {
    background: #2f3e4e;
  }
  40% {
    background: lighten($color: #2f3e4e, $amount: 6);
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
  }
  100% {
    background: lighten($color: #2f3e4e, $amount: 6);
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
  }
}

@keyframes pageTurn {
  0% {
    transform: rotateY(0deg);
  }
  20% {
    background: #2f3e4e;
  }
  40% {
    background: lighten($color: #2f3e4e, $amount: 6);
    transform: rotateY(-180deg);
  }
  100% {
    background: lighten($color: #2f3e4e, $amount: 6);
    transform: rotateY(-180deg);
  }
}

@-webkit-keyframes Dots {
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
}

@keyframes Dots {
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
}
</style>
