<template>
  <div id="app">
    <Header :isSignedIn="isSignedIn"/>
    <router-view/>
  </div>
</template>
<script>
import Header from '@/views/partials/Header'
export default {
  components: { Header },
  computed: {
    isSignedIn() {
      return this.$store.getters.isSignedIn
    }
  },
  mounted() {
    this.$store.dispatch('AUTHENTICATE')
    if (this.$store.getters.isSignedIn) {
      this.$store.dispatch('GET_ALL_BOOKS')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.control-group {
  width: 100%;
  margin-bottom: 10px;
  input[type='text'] {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 8px 10px;
  }
  .drop-zone {
    position: relative;
    border: 2px dashed #ccc;
    width: 100%;
    height: 93px;
    box-sizing: border-box;
    p {
      padding: 10px;
    }
  }
  input[type='file'] {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
  }
  textarea {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 8px 10px;
    height: 200px;
  }
}

.button,
.control-group input[type='submit'] {
  background: #2f3e4e;
  border-radius: 3px;
  color: #fff;
  padding: 5px 10px;
  border: 0;
  transition: all 0.3s;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.02em;
  display: inline-block;
  &:hover {
    background-color: #fff;
    color: #2f3e4e;
    border: 1px solid;
    cursor: pointer;
    text-decoration: none;
  }
  &.disabled {
    pointer-events: none;
    opacity: 0.3;
  }
}
</style>
