<template>
  <div class="comparison-card">
    <p>Items</p>
  </div>
</template>

<script>
export default {
  name: "comparison-tool",
  props: {
    country: String
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
</style>