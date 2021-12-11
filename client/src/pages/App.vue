<template>
  <div id="app">
    <app-header></app-header>
    <div class="content">
      <div class="main">
        <ul>
          <li v-for="(car, index) in queryResponse" :key="index">
            <car-card :car="car"></car-card>
          </li>
        </ul>
      </div>
      <right-bar></right-bar>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import CarCard from "../components/CarCard.vue";
import RightBar from "../components/RightBar.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    CarCard,
    RightBar,
  },
  data() {
    return {
      queryResponse: [
        {
          make: "Hyundai",
          model: "i20",
          currency: "₺",
          price: 120000,
          imageURL: require("../../public/somecar.jpeg"),
        },
        {
          make: "BMW",
          model: "1 serisi",
          currency: "₺",
          price: 300000,
          imageURL: require("../../public/somecar.jpeg"),
        },
        {
          make: "Ford",
          model: "Focus",
          currency: "₺",
          price: 135000,
          imageURL: require("../../public/somecar.jpeg"),
        },
        {
          make: "BMW",
          model: "1 serisi",
          currency: "₺",
          price: 300000,
          imageURL: require("../../public/somecar.jpeg"),
        },
        {
          make: "BMW",
          model: "1 serisi",
          currency: "₺",
          price: 300000,
          imageURL: require("../../public/somecar.jpeg"),
        },
        {
          make: "BMW",
          model: "1 serisi",
          currency: "₺",
          price: 300000,
          imageURL: require("../../public/somecar.jpeg"),
        },
        {
          make: "BMW",
          model: "1 serisi",
          currency: "₺",
          price: 300000,
          imageURL: require("../../public/somecar.jpeg"),
        },
      ],
    };
  },
  methods: {
    onQueryResult: function (response) {
      console.log(response);
    },
    mockSearchQuery: function (query) {
      return {query}
    }
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Arial",sans-serif;
  font-size: 13px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.content {
  width: 85%;
  margin: auto;
}

.main {
  margin-right: 150px;
}
</style>
