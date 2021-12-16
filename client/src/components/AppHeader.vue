<template>
  <header>
    <h1>Prices Around The World</h1>
    <search></search>
    <nav>
      <ul>
        <li><a @click="collapse" href="">Categories</a></li>
        <li><a @click="collapse" href="">Countries</a></li>
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
  },
  data() {
    return {
      isCollapsed: false,
    }
  },
  methods: {
    collapse: function() {
      this.$emit("collapse")
    }
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
  box-shadow: 0 1.5px lightgrey;
  height: 60px;
  margin: 0;
  padding: 0;
}

nav {
  width: 20%;
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
