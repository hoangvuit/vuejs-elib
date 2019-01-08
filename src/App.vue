<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav class="navbar navbar-expand-lg navbar-dark">
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
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li :class="$route.path === '/admin' ? 'nav-item active' : 'nav-item'">
                    <router-link to="/admin" class="nav-link">Admin</router-link>
                    <!-- <a class="nav-link" href="/admin">
                      Admin
                      <span class="sr-only">(current)</span>
                    </a>-->
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  background-color: #2c3e50;
  padding: 20px 0;
  margin-bottom: 70px;
  h1 {
    color: #fff;
  }
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
  textarea {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 8px 10px;
    height: 200px;
  }
  input[type='submit'] {
    background: #2f3e4e;
    border-radius: 3px;
    color: #fff;
    padding: 5px 10px;
    border: 0;
    transition: all 0.3s;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.02em;
    &:hover {
      background-color: #fff;
      color: #2f3e4e;
      border: 1px solid;
      cursor: pointer;
    }
  }
}
</style>
