<template>
  <div id="home">
    <app-header @onQuery="query"></app-header>
    <div class="content">
      <!--      Selects start-->
      <div class="selects">
        <span class="help">Select countries and a category to compare prices</span>
        <select class="select" v-model="selectedCountry" @change="addSelectedCountry">
          <option disabled value="">Select a country</option>
          <option>United States</option>
          <option>Luxembourg</option>
        </select>
        <select class="select" v-model="selectedCategory" @change="retrieve(pageNo)">
          <option disabled value="">Select a category</option>
          <option>car</option>
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
          <div class="comparison-cards" v-for="(carItem, idx) in listResponse[country]" :key="idx">
            <comparison-tool :car="carItem"></comparison-tool>
          </div>
        </div>
        <div class="up-down-container">
          <i class="bi bi-arrow-up-circle up-down" @click="pageNo > 1 ? pageNo-- : null; list(pageNo)"></i>
          <i class="bi bi-arrow-down-circle up-down" @click="pageNo++; list(pageNo)"></i>
        </div>
      </div>
      <!--      Comparison container ends-->
      <!--      Car cards start-->
      <div v-if="queryResponse.length > 0">
        <h2 class="help">Search results</h2>
        <div class="search-results">
          <ul>
            <li v-for="(carItem, idx) in queryResponse" :key="idx">
              <car-card :car="carItem"></car-card>
            </li>
          </ul>
        </div>
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
import {getAllCategoryItems, getQueryItems} from "../api.js";
import {encodeByCountry, paginate} from "../utils.js";

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
      retrieveResponse: [],
      listResponse: {},
      queryResponse: [],
      bothSelectsChecked: false,
      pageNo: 1,
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
    query: async function (value) {
      this.queryResponse = await getQueryItems(value);
      console.log(this.queryResponse)
    },
    retrieve: async function (pageNo) {
      this.retrieveResponse = await getAllCategoryItems(this.selectedCategory);
      this.list(pageNo);
    },
    list: function (pageNo) {
      const encodedItems = encodeByCountry(this.retrieveResponse);
      for (const [key, value] of Object.entries(encodedItems)) {
        encodedItems[key] = paginate(value, 5, pageNo);
      }
      this.listResponse = encodedItems;
    },
    initSelect: function () {
      this.selectedCategory = "car";
      this.selectedCountries = ["United States", "Luxembourg"];
      this.bothSelectsChecked = true;
      this.retrieve(this.pageNo);
    }
  },
  mounted() {
    this.initSelect();
  }
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
  margin-left: 10px;
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

.up-down-container {
  width: 18px;
  margin: auto 0;
}

.up-down {
 display: inline-block;
  margin: 3px 0;
  cursor: pointer;
  font-size: 16px;
  background-color: rgba(250, 249, 249, 0.98);
  border-radius: 50%;
}

.up-down:hover {
  background-color: lightgrey;
}
.search-results {
  margin-top: 25px;
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
