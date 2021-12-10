<template>
  <div class="car-card">
    <h2 class="car-title">{{ formatCarTitle() }}</h2>
    <p class="car-price">
      <bold>{{ car.currency }}</bold>
      {{ car.price }}
    </p>
    <div class="car-details">
        <p><strong>Year</strong> {{ car.year }}</p>
        <p><strong>Mileage</strong> {{ car.mileage }}</p>
        <p><strong>Fuel Type</strong> {{ car.fuel }}</p>
        <p><strong>Engine</strong> {{ car.features }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "car-card",
  props: { 
    car: Object,
    carTitle: String
  },
  methods: {
    formatCarTitle: () => {
      console.log(`car props: ${this.car}`)
      return `${this.car.make}, ${this.car.model}`
    },
    created: () => {
      console.log("created")
      console.log(this.carTitle)
    },
    mounted: () => {
      console.log("mounted")
      console.log(this.car)
    }
  },
};
</script>

<style scoped>
.car-card {
    border-style: solid;
    border-width: 1px;
    height: 200px;
    width: 100%;
}

.car-details {

}
</style>
