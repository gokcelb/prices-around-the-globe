<template>
  <div class="car-card">
    <img class="car-img" alt="some car" :src="car.imageURL">
    <div class="car-info">
      <p>{{ formattedCarTitle }}</p>
      <p>{{ car.currency }}{{ car.price }}</p>
    </div>
    <div class="car-details">
      <i class="bi arrow" @click="toggleDetails" :class="{'bi-caret-down-fill': isClicked, 'bi-caret-right-fill': !isClicked}">Details</i>
      <div class="details" v-if="detailsToggled">
        <p>Year: {{ car.year }}</p>
        <p>Mileage: {{ car.mileage }}</p>
        <p>Fuel Type: {{ car.fuel }}</p>
        <p>Engine: {{ car.features }}</p>
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
  box-shadow: 2px 4px lightgrey;
  float: left;
  min-height: 150px;
  height: auto;
  max-width: 180px;
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
  font-size: 14px;
}

.car-details {
  margin-left: 10px;
  margin-top: 10px;
  color: grey;
}

.details {
  margin-left: 15px;
}

.arrow {
  cursor: pointer;
}
</style>
