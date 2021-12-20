<template>
  <div id="category">
    <app-header></app-header>
    <div class="content">
      <h2 style="color: mediumseagreen; margin: 30px 0 10px 30px">Categories</h2>
      <h3 style="margin: 30px 0 10px 40px;">{{ $route.params.category }}</h3>
      <div class="search-results">
        <ul>
          <li v-for="(carItem, idx) in results" :key="idx">
            <car-card :car="carItem"></car-card>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader";
import CarCard from "../components/CarCard";
import {getCategoryItems} from "../api";

export default {
  name: "Category",
  components: {
    AppHeader,
    CarCard
  },
  data () {
    return {
      category: this.$route.params.category,
      results: []
    }
  },
  methods: {
    retrieveCategoryItems: async function () {
      console.log(this.category)
      this.results = await getCategoryItems(this.category);
    },
  },
  mounted () {
    this.retrieveCategoryItems();
  }
}
</script>

<style scoped>
.content {
  float: left;
  width: 90%;
  margin: 0 5%;
}

.search-results > ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.search-results > ul > li {
  margin: 10px 20px 10px 0;
}
</style>