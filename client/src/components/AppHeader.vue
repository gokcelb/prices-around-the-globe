<template>
  <header>
    <h1>Prices Around The World</h1>
    <search></search>
    <nav>
      <ul>
        <li><a href="">Categories</a></li>
        <li><a href="">Countries</a></li>
        <li><a href="">About Us</a></li>
        <li><a href="">Language</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Search from "../components/Search.vue";

export default {
  name: 'app-header',
  components: {
    Search,
  }
}
</script>

<style scoped>
h1 {
  color: mediumseagreen;
  margin: auto 0 auto 10%;
  font-size: 22px;
}

header {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px lightgrey;
  height: 60px;
  margin: 0;
  padding: 0;
}

nav {
  width: 35%;
}
a {
  color: inherit;
}
a:link {
  text-decoration: none;
}

nav > ul {
  display: flex;
  margin: 25px 0;
}

nav > ul > li {
  margin: 0 6%;
}
</style>
