<template>
  <div>
    <input @keydown="onEnter" placeholder="Search for a commodity">
  </div>
</template>

<script>
export default {
  name: "Search.vue",
  data() {
    return {

    }
  },
  methods: {
    onEnter: (event) => {
      if (event.key === "Enter") {
        this.destructureSearchedValue()
      }
    },
    destructureSearchedValue: () => {

    },
  }
}
</script>

<style scoped>

</style>