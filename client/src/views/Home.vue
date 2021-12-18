<template>
  <div id="home">
    <app-header></app-header>
    <div class="content">
      <!--      Selects start-->
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
      <!--      Selects end-->
      <!--      Comparison container starts-->
      <div class="comparison-container" v-if="selectedCountries.length > 0">
        <div class="comparison" v-for="country in selectedCountries" :key="country">
          <div class="countries">
            <i class="bi bi-x delete-icon" @click="deleteFromSelected(country)"></i>
            <span>{{ country }}</span>
          </div>
          <div class="comparison-cards" v-for="(carItem, idx) in queryResponse[country]" :key="idx">
            <comparison-tool :country="carItem.country"></comparison-tool>
          </div>
        </div>
      </div>
      <!--      Comparison container ends-->
      <!--      Car cards start-->
      <h2 class="help">Search results</h2>
      <div class="search-results" v-for="(value, name) in queryResponse" :key="name">
        <h4>{{ name }}</h4>
        <ul>
          <li v-for="(carItem, idx) in value" :key="idx">
            <car-card :car="carItem"></car-card>
          </li>
        </ul>
      </div>
      <!--      Car cards end-->
      <!--      <right-bar></right-bar>-->
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import CarCard from "../components/CarCard.vue";
// import RightBar from "../components/RightBar.vue";
import ComparisonTool from "../components/ComparisonTool.vue";

export default {
  name: "Home",
  components: {
    AppHeader,
    CarCard,
    // RightBar,
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
            price: "120,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
          },
          {
            country: "Turkey",
            make: "BMW",
            model: "1 series",
            currency: "₺",
            price: "300,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2000",
            fuel: "Gas",
            features: "2C Pheonix",
            mileage: "10,000",
          },
          {
            country: "Turkey",
            make: "BMW",
            model: "1 series",
            currency: "₺",
            price: "300,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
          },
          {
            country: "Turkey",
            make: "Hyundai",
            model: "i20",
            currency: "₺",
            price: "120,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
          },
          {
            country: "Turkey",
            make: "Hyundai",
            model: "i10",
            currency: "₺",
            price: "100,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
          },

          {
            country: "Turkey",
            make: "Hyundai",
            model: "i20",
            currency: "₺",
            price: "120,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
          },
          {
            country: "Turkey",
            make: "Hyundai",
            model: "i20",
            currency: "₺",
            price: "120,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
          },
          {
            country: "Turkey",
            make: "Hyundai",
            model: "i20",
            currency: "₺",
            price: "120,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
          },
        ],
        "United States": [
          {
            country: "United States",
            make: "Ford",
            model: "Focus",
            currency: "$",
            price: "13,500",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
          },
          {
            country: "United States",
            make: "BMW",
            model: "1 series",
            currency: "$",
            price: "43,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
          },
        ],
        Luxembourg: [
          {
            country: "Luxembourg",
            make: "BMW",
            model: "1 series",
            currency: "€",
            price: "28,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
          },
          {
            country: "Luxembourg",
            make: "BMW",
            model: "1 series",
            currency: "€",
            price: "28,000",
            imageURL: require("../../public/somecar.jpeg"),
            year: "2010",
            fuel: "Diesel",
            features: "2B 2B",
            mileage: "78,000",
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
  },
};
</script>

<style scoped>
.search-results > ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.search-results > ul > li {
  margin: 10px 20px 10px 0;
}

.content {
  float: left;
  width: 90%;
  margin: 0 5%;
}

.selects {
  width: 97%;
  height: 50px;
  display: flex;
  justify-content: right;
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
  height: auto;
  margin-bottom: 30px;
  margin-top: 10px;
}

.comparison {
  float: left;
  width: 30%;
  margin-right: 3%;
}

.help {
  color: mediumseagreen;
  font-style: italic;
  font-weight: 600;
  align-self: center;
  margin-top: 20px;
  margin-right: 20px;
}

.delete-icon {
  cursor: pointer;
}

.countries {
  display: inline-block;
  margin: 10px 0;
  padding: 3px 6px 3px 2px;
  border-style: solid;
  border-color: lightgrey;
  border-width: 1px;
  border-radius: 10px;
  background-color: rgba(250, 249, 249, 0.98);
}

.comparison-cards {
  margin-bottom: 5px;
}

.search-results {
  margin-top: 25px;
}
</style>
