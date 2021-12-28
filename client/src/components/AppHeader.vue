<template>
  <header>
    <h1><a href="/">Prices Around The Globe</a></h1>
    <search v-on="$listeners"></search>
    <nav>
      <ul>
        <li>
          <a>Categories</a>
          <ul>
            <li><a href="/categories/car">Car</a></li>
          </ul>
        </li>
        <li>
          <a>Countries</a>
          <ul>
            <li><a href="/countries/Turkey">Turkey</a></li>
            <li><a href="/countries/United-States">United States</a></li>
            <li><a href="/countries/Luxembourg">Luxembourg</a></li>
          </ul>
        </li>
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
  margin: auto 0 auto 2%;
  font-size: 22px;
}

header {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1.5px lightgrey;
  height: 60px;
}

nav {
  width: 20%;
  display: flex;
  margin: auto 0;
  justify-content: left;
}

nav ul {
  -webkit-transition: .3s;
  transition: .3s;
  z-index: 1;
}

nav ul li {
  display: inline;
  position: relative;
  float: left;
  width: 140px;
  -webkit-transition: .3s;
  transition: .3s;
  border-radius: 5px;
}

nav a {
  padding: 5px 15px;
  display: block;
}

nav ul ul {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  left: 0;
  top: 100%;
}

nav li:hover, nav li:hover li {
  border-style: solid;
  border-width: 1px;
  border-color: lightgrey;
  box-shadow: 1px 2px lightgrey;
  background-color: rgba(250, 249, 249, 0.98);
  /*background-color: #ddd;*/
}

nav li li:hover, nav li li:hover li {
  background-color: #bbb;
}

nav li:hover ul {
  visibility: visible;
  opacity: 1;
}
</style>
