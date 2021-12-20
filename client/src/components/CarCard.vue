<template>
  <div class="car-card">
    <img class="car-img" alt="some car" src="../../public/somecar.jpeg">
    <div class="car-info">
      <p>{{ formattedCarTitle }}</p>
      <p>{{ car.currency }}{{ car.price }}</p>
    </div>
    <div class="car-details">
      <i class="bi arrow" @click="toggleDetails" :class="{'bi-caret-down-fill': isClicked, 'bi-caret-right-fill': !isClicked}">Details</i>
      <div class="details" v-if="detailsToggled">
        <div v-if="car.year">
          <p>Year: {{ car.year }}</p>
        </div>
        <div v-if="car.mileage">
          <p>Mileage: {{ car.mileage }}</p>
        </div>
        <div v-if="car.fuel">
          <p>Fuel Type: {{ car.fuel }}</p>
        </div>
        <div v-if="car.features">
          <p>Engine: {{ car.features }}</p>
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
    formattedCarTitle: function () {
      return `${this.car.make} ${this.car.model}`;
    }
  },
};
</script>

<style scoped>
.car-card {
  float: left;
  min-height: 150px;
  height: auto;
  max-width: 180px;
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
  height: 60%;
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

.details {
  margin-left: 15px;
}

.arrow {
  cursor: pointer;
}
</style>
