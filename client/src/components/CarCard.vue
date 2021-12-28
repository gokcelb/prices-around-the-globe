<template>
  <div class="car-card">
    <a :href="car.imageURL" target="_blank"><img class="car-img" alt="Car Image" :src="car.imageURL"></a>
    <div class="car-info">
      <p>{{ car.make }}</p>
      <p>{{ car.currency }}{{ car.price }}</p>
    </div>
    <div class="car-details">
      <i class="bi arrow" @click="toggleDetails" :class="{'bi-caret-down-fill': isClicked, 'bi-caret-right-fill': !isClicked}">Details</i>
      <div class="details" v-if="detailsToggled">
        <div v-if="car.modelFeatures">
          <p><span class="details-title">Model</span>: {{ car.modelFeatures }}</p>
        </div>
        <div v-if="car.year">
          <p><span class="details-title">Year</span>: {{ car.year }}</p>
        </div>
        <div v-if="car.mileage">
          <p><span class="details-title">Mileage</span>: {{ car.mileage }}</p>
        </div>
        <div v-if="car.fuel">
          <p><span class="details-title">Fuel Type</span>: {{ car.fuel }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "car-card",
  props: { 
    car: Object,
  },
  data() {
    return {
      detailsToggled: false,
      isClicked: false,
    }
  },
  methods: {
    toggleDetails: function () {
      this.detailsToggled = !this.detailsToggled;
      this.isClicked = !this.isClicked;
    }
  },
  computed: {
    // formattedCarInfo: function () {
    //   return `${this.car.make} ${this.car.model} ${this.car.features}`;
    // }
  },
};
</script>

<style scoped>
.car-card {
  float: left;
  min-height: 50px;
  height: auto;
  max-width: 180px;
  width: 180px;
  margin: 2% 1%;
  padding: 10px;
}

.car-card:hover {
  border-style: solid;
  border-width: 1px;
  border-color: lightgrey;
  box-shadow: 1px 2px lightgrey;
}

.car-img {
  height: auto;
  width: 90%;
}

.car-info {
  display: flex;
  justify-content: space-between;
  padding: 0 8%;
  font-size: 13px;
}

.car-details {
  margin-left: 10px;
  margin-top: 10px;
  color: grey;
}

.details-title {
  /*text-decoration: underline;*/
  /*font-style: italic;*/
}

.details {
  margin-left: 15px;
}

.arrow {
  cursor: pointer;
}


img {
  border-radius: 5px;
}

</style>
