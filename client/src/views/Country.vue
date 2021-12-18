<template>
  <div>
    <app-header></app-header>
    <div class="country-card">
      <h2>{{ $route.params.country }}</h2>
      <div class="info">
        <h4>Population</h4>
        <p>84.000.000</p>
        <h4>Minimum wage</h4>
        <p>$251 per month</p>
        <h4>Purchase Power</h4>
        <p>0.32</p>
      </div>
      <div class="categories">
        <h2>Related Categories</h2>
        <div class="info">
          <p>Car</p>
          <p>Food</p>
          <p>Real Estate</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader";

export default {
  name: "Country",
  components: {
    AppHeader
  }
}
</script>

<style scoped>
  .country-card {
    margin: 20px 0 0 30px;
    line-height: 1.5;
  }

  .info {
    padding: 0px 10px;
  }

  .categories {
    margin-top: 40px;
  }
</style>