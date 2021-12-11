<template>
  <div class="car-card">
    <img class="car-img" alt="some car" :src="car.imageURL">
    <div class="car-info">
      <p class="car-title">{{ formattedCarTitle }}</p>
      <p class="car-price">{{ car.currency }}{{ car.price }}</p>
    </div>
    <div v-if="show" class="car-details">
        <p><b>Year</b> {{ car.year }}</p>
        <p><b>Mileage</b> {{ car.mileage }}</p>
        <p><b>Fuel Type</b> {{ car.fuel }}</p>
        <p><b>Engine</b> {{ car.features }}</p>
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
      show: false,
    }
  },
  methods: {

  },
  computed: {
    formattedCarTitle: function () {
      return `${this.car.make} ${this.car.model}`;
    }
  },
};
</script>

<style scoped>
.car-card {
  border-style: solid;
  border-width: 1px;
  border-color: lightgrey;
  box-shadow: 4px 7px lightgrey;
  float: left;
  height: 170px;
  width: 16%;
  margin: 2% 1%;
  padding: 10px;
}

.car-img {
  height: 60%;
  width: 90%;
}

.car-info {
  display: flex;
  justify-content: space-between;
  padding: 0 8%;
}

.car-title {
}

.car-details {

}
</style>
