<template>
  <div id="app">
    <app-header :collapse="collapse"></app-header>
    <div class="content">
      <div class="selects">
        <span class="help">Select countries and a category to compare prices</span>
        <select class="select" v-model="selectedCountry" @change="addSelectedCountry">
          <option disabled value="">Select a country</option>
          <option>Turkey</option>
          <option>United States</option>
          <option>Luxembourg</option>
        </select>
        <select class="select" v-model="selectedCategory">
          <option disabled value="">Select a category</option>
          <option>Car</option>
        </select>
      </div>
      <div class="selectedCountry-countries">
        YOUR SELECTIONS: {{ selectedCountries }}
      </div>
      <div class="comparison-container" v-if="selectedCountries.length > 0">
          <div class="comparison" v-for="country in selectedCountries" :key="country">
            <div>
              <span>{{ country }}</span>
              <button id="${country}" @click="deleteFromSelected(country)">x</button>
            </div>
            <div v-for="(carItem, idx) in queryResponse[country]" :key="idx">
              <comparison-tool :country="carItem.country"></comparison-tool>
            </div>
          </div>
      </div>
      <!--      car cards start-->
      <h2 class="help">Search results</h2>
      <div class="search-results" v-for="(value, name) in queryResponse" :key="name">
        <h4>{{ name }}</h4>
        <ul>
          <li v-for="(carItem, idx) in value" :key="idx">
            <car-card :car="carItem"></car-card>
          </li>
        </ul>
      </div>
      <!--      car cards end-->
      <right-bar></right-bar>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import CarCard from "../components/CarCard.vue";
import RightBar from "../components/RightBar.vue";
import ComparisonTool from "../components/ComparisonTool.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    CarCard,
    RightBar,
    ComparisonTool,
  },
  data() {
    return {
      selectedCountry: '',
      selectedCountries: [],
      newSelectedCountries: [],
      selectedCategory: '',
      queryResponse: {
        Turkey: [
          {
            country: "Turkey",
            make: "Hyundai",
            model: "i20",
            currency: "₺",
            price: 120000,
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: 78000,
          },
          {
            country: "Turkey",
            make: "BMW",
            model: "1 series",
            currency: "₺",
            price: 300000,
            imageURL: require("../../public/somecar.jpeg"),
            year: "2000",
            fuel: "Gas",
            features: "2C Pheonix",
            mileage: 10000,
          },
          {
            country: "Turkey",
            make: "BMW",
            model: "1 series",
            currency: "₺",
            price: 300000,
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: 78000,
          },
          {
            country: "Turkey",
            make: "Hyundai",
            model: "i20",
            currency: "₺",
            price: 120000,
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: 78000,
          },
          {
            country: "Turkey",
            make: "Hyundai",
            model: "i10",
            currency: "₺",
            price: 100000,
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: 78000,
          },
        ],
        "United States": [
          {
            country: "United States",
            make: "Ford",
            model: "Focus",
            currency: "₺",
            price: 135000,
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: 78000,
          },
          {
            country: "United States",
            make: "BMW",
            model: "1 series",
            currency: "₺",
            price: 300000,
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: 78000,
          },
        ],
        Luxembourg: [
          {
            country: "Luxembourg",
            make: "BMW",
            model: "1 series",
            currency: "₺",
            price: 300000,
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: 78000,
          },
          {
            country: "Luxembourg",
            make: "BMW",
            model: "1 series",
            currency: "₺",
            price: 300000,
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: 78000,
          },
        ]
      },
    };
  },
  methods: {
    addSelectedCountry: function () {
      if (!this.selectedCountries.includes(this.selectedCountry)) {
        this.selectedCountries.push(this.selectedCountry);
        console.log(this.selectedCountries)
      }
    },
    deleteFromSelected: function (country) {
      this.newSelectedCountries = [];
      for (let i = 0; i < this.selectedCountries.length; i++) {
        let currCountry = this.selectedCountries[i];
        if (country !== currCountry) {
          this.newSelectedCountries.push(currCountry);
        }
        console.log(this.newSelectedCountries)
      }
      this.selectedCountries = this.newSelectedCountries.slice();
    },
    onQueryResult: function (response) {
      console.log(response);
    },
    mockSearchQuery: function (query) {
      return {query}
    },
    collapse: function () {
      this.isCollapsed = true;
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

body {
  font-family: "Arial",sans-serif;
  font-size: 13px;
}

.search-results > ul {
  list-style: none;
  display: flex;
}

.search-results > ul > li {
  margin: 10px 30px 10px 0;
}

.content {
  float: left;
  width: 77%;
  margin: 0 0 0 40px;
}

.selects {
  width: 97%;
  height: 50px;
  display: flex;
  justify-content: right;
  margin-right: 3%;
}

.select {
  width: 170px;
  height: 27px;
  margin-left: 10px;
  margin-top: 20px;
  border-radius: 5px;
  border-color: lightgrey;
}

.comparison-container {
  display: flex;
  width: 100%;
  height: 230px;
  margin-bottom: 30px;
  overflow: auto;
}

.comparison {
  float: left;
  width: 30%;
  margin-right: 5%;
}

.help {
  color: mediumseagreen;
  font-style: italic;
  font-weight: 600;
  align-self: center;
  margin-top: 20px;
  margin-right: 20px;
}

.search-results {

}
</style>
