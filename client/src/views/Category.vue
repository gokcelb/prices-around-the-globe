<template>
  <div id="category">
    <app-header></app-header>
    <div class="content">
      <h3 class="category-name">{{ capitalizedCategory }}</h3>
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
      this.results = await getCategoryItems(this.category);
    },
  },
  computed: {
    capitalizedCategory: function () {
      return this.$route.params.category.charAt(0).toUpperCase() + this.$route.params.category.slice(1);
    }
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

.category-name {
  margin: 30px 60px 10px 20px;
  background-color: mediumseagreen;
  color: white;
  padding: 10px;
  border-radius: 10px;
  opacity: 0.9;
  font-size: 16px;
}
</style>