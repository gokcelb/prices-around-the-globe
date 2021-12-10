<template>
  <div id="app">
    <AppHeader></AppHeader>
    <search @search="onQuerySearch" :search-query="mockSearchQuery"></search>
    <ul>
      <li v-for="(car, index) in queryResponse" :key="index">
        <p>{{ car.model }}</p>
        <car-card :car="car" car-title="car.title"></car-card>
      </li>
    </ul>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import Search from "@/components/Search.vue";
import CarCard from "@/components/CarCard.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    Search,
    CarCard,
  },
  data() {
    return {
      queryResponse: [
        {
          make: "Make",
          model: "Hyundai",
          currency: "TRY",
          price: 121321,
        },
      ],
    };
  },
  methods: {
    onQuerySearch: function (response) {
      console.log(response);
    },
    mockSearchQuery: async function (query) {
      console.log(`query= ${query}`);
    },
  },
};
</script>

<style>
</style>
