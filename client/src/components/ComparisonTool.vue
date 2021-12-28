<template>
  <div class="comparison-card">
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
        <div v-if="car.imageURL">
          <p><span class="details-title">Image</span>: <a target="_blank" style="text-decoration: underline" :href="car.imageURL">Click to see image</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comparison-tool",
  props: {
    car: Object,
  },
  data () {
    return {
      detailsToggled: false,
      isClicked: false,
    }
  },
  methods: {
    toggleDetails: function () {
      this.detailsToggled = !this.detailsToggled;
      this.isClicked = !this.isClicked;
    },
  }
}
</script>

<style scoped>
.comparison-card {
  border-style: solid;
  border-width: 1px;
  border-color: lightgrey;
  border-radius: 10px;
  height: 100%;
  width: 90%;
  margin: 0;
  padding: 10px;
}

.car-info {
  width: 40%;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.car-details {
  margin-top: 5px;
  color: grey;
}

.arrow {
  cursor: pointer;
}
</style>