<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="avatar" v-show="isSignedIn">
              <img :src="avatar" :alt="name">
            </div>
            <a class="navbar-brand" href="/">e-Lib</a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse justify-content-end align-items-stretch"
              id="navbarNavDropdown"
            >
              <ul class="navbar-nav">
                <li
                  v-if="isSignedIn"
                  :class="$route.path === '/add-book' ? 'nav-item active' : 'nav-item'"
                >
                  <router-link to="/add-book" class="nav-link">Add New Book</router-link>
                </li>
              </ul>
              <ul class="navbar-nav">
                <li
                  v-if="!isSignedIn"
                  :class="$route.path === '/login' ? 'nav-item active' : 'nav-item'"
                >
                  <router-link to="/login" class="nav-link">Login</router-link>
                </li>
                <li v-if="isSignedIn">
                  <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noAvatar from '@/assets/no-avatar.png'
import store from '@/store'

export default {
  props: {
    isSignedIn: Boolean
  },
  computed: {
    name() {
      return store.getters.signedInUser.name
    },
    avatar() {
      return store.getters.signedInUser.avatar || noAvatar
    },
    email() {
      return store.getters.signedInUser.email
    }
  },
  methods: {
    logout() {
      this.$gAuth
        .signOut()
        .then(() => {
          localStorage.removeItem('auth-obj')
          this.$store.dispatch('AUTHENTICATE')
          this.$router.push('/login')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #2c3e50;
  padding: 20px 0;
  margin-bottom: 90px;
  h1 {
    color: #fff;
  }
  ul {
    li {
      a {
        margin-top: 6px;
      }
    }
  }
  .avatar {
    width: 48px;
    margin-right: 20px;
    display: inline-block;
    border-radius: 50%;
    border: 1px solid #666;
    background-color: #ccc;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .navbar {
    padding: 0;
  }
}
</style>
