<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h2>Login with your Google account</h2>
        <a class="button button--social-login button--google" href="#" @click.prevent="googleLogin">
          <i class="icon fab fa-google"></i> Login With Google
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'
export default {
  data: function() {
    return {
      isSignedIn: false
    }
  },
  methods: {
    googleLogin() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          this.$router.push({ name: 'login', query: { redirect: '/' } })
          this.isSignedIn = this.$gAuth.isAuthorized
          store.dispatch('AUTHENTICATE', GoogleUser)
          if (this.isSignedIn) {
            let user = {
              id: GoogleUser.w3.Eea,
              email: GoogleUser.w3.U3,
              fullname: GoogleUser.w3.ig,
              name: GoogleUser.w3.ofa
            }
            store.dispatch('ADD_USER', user)
            this.$router.push(this.$route.query.redirect)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted: function() {
    this.$store.dispatch('AUTHENTICATE')
    if (this.$store.getters.isSignedIn) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 50px;
}
$base-spacing-unit: 24px;
$half-spacing-unit: 12px;
$border-radius-global: 5px;
$button-width: auto;
$button-height: 50px;
$button-text-color: white;

$social-list: (
  facebook #4b70ab,
  linkedin #0087be,
  google #dd4b39,
  twitter #3b94d9,
  yahoo #500095,
  openid #f78c40,
  googleplus #dd4b39,
  dropbox #007de1,
  github #333,
  bitbucket #205081,
  soundcloud #ff5500,
  spotify #2ebd59,
  microsoft #00a4ef,
  flickr #ff0084
);

%button,
.button {
  width: $button-width;
  display: inline-block;
  padding: 0 ($base-spacing-unit - ($half-spacing-unit / 2)) 0
    ($half-spacing-unit / 2);
  border: 0 none;
  border-radius: $border-radius-global;
  text-decoration: none;
  transition: all 250ms linear;

  &:hover {
    text-decoration: none;
  }
}

.button--social-login {
  margin-bottom: $half-spacing-unit;
  margin-right: $half-spacing-unit;
  color: $button-text-color;
  height: $button-height;
  line-height: $button-height - 4;
  position: relative;
  text-align: left;

  .icon {
    margin-right: $half-spacing-unit;
    font-size: 22px;
    line-height: $base-spacing-unit;
    width: ($base-spacing-unit * 2) - ($half-spacing-unit / 2);
    height: $base-spacing-unit;
    text-align: center;
    display: inline-block;
    position: relative;
    top: 4px;

    &:before {
      display: inline-block;
      width: ($base-spacing-unit * 2) - ($half-spacing-unit / 2) - 2;
    }

    &:after {
      content: '';
    }
  }
}

@each $name, $color in $social-list {
  .button--#{$name} {
    background-color: $color;
    border: 1px solid darken($color, 10%);

    .icon {
      border-right: 1px solid darken($color, 10%);

      &:after {
        border-right: 1px solid lighten($color, 10%);
      }
    }

    &:hover {
      background-color: darken($color, 5%);
    }
  }
}
</style>
