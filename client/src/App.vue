<template>
  <div id="app">
    <AppHeader></AppHeader>
    <Search></Search>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import Search from './components/Search.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    Search,
  }
}
</script>

<style>

</style>
