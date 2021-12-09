<template>
  <div>
    <input
      v-model="searchValue"
      @keypress="onEnter"
      placeholder="Search for a commodity"
    />
    <button @click="search">Search</button>
  </div>
</template>

<script>
export default {
  name: "search",
  props: [ 'searchQuery' ],
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    onEnter: (event) => {
      if (event.key === "Enter") {
        this.destructureSearchedValue();
      }
    },
    search: async () => {
      console.log("search function ran")
      const response = await this.searchQuery(this.searchValue)
      this.$emit('search', response)
    },
  },
};
</script>

<style scoped>
</style>