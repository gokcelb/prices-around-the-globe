<template>
  <div class="search-container">
    <input class="search-input"
      v-model="searchValue"
      @keydown="onType"
      placeholder="Search for a commodity"
      autocomplete="auto"
    />
    <button class="search-button" @click="query"><i class="bi bi-search icon"></i></button>
<!--    <p>{{ recommendations }}</p>-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "search",
  props: {
    searchQuery: Function,
  },
  data() {
    return {
      searchValue: "",
      recommendations: [],
    };
  },
  methods: {
    query: function () {
      this.$emit('query', this.searchQuery(this.searchValue));
    },
    onType: async function(event) {
      try {
        if (event.key === "Enter") {
          this.query();
          return;
        }
        if(this.searchValue < 2) return;
        if(this.recommendations.length === 0) {
          const { data } = await axios.get('http://localhost:5000/search');
          console.log(data);
          this.recommendations.push(...data);
        } else {
          // execute autocomplete logic with the data you have
        }
      } catch (e) {
        console.error(e);
      }
    }
  },
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css");

.search-container {
  text-align: center;
  width: 25%;
  margin: auto 0;
}

.search-input {
  width: 80%;
  height: 24px;
  border-width: 0.5px;
  border-color: lightgrey;
  border-style: solid;
}

input:focus {
  outline: none;
  border-width: 1px;
  border-color: grey;
}

.search-button {
  width: 10%;
  height: 25.6px;
  border-width: 0.5px;
  border-color: lightgrey;
  border-style: solid;
}

button:hover {
  cursor: pointer;
}
</style>