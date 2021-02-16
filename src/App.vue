<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Игра</router-link> |
      <router-link to="/result">Результаты</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: rgb(193, 203, 206);
}

#nav {
  padding-top: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #e78a32;
    }
  }
}
</style>
