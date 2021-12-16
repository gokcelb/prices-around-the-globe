<template>
  <div class="side-bar">
    <h3>Would you like to know more about these?</h3>
    <a>BMW 1 series in Turkey</a>
    <a>Ford Focus in the US</a>
    <a>Honda Civic in Japan</a>
    <a>Minimum wage in Canada</a>
    <a>Population of Indonesia</a>
    <a>Purchasing power of Turkey</a>
    <a>Minimum wage of the US</a>
  </div>
</template>

<script>
export default {
  name: "right-bar"
}
</script>

<style scoped>
.side-bar {
  height: auto;
  max-height: 35%;
  width: 12%;
  position: absolute;
  margin-top: 82px;
  top: 0;
  right: 50px;
  padding: 10px 10px;
  border-width: 1px;
  border-color: lightgrey;
  border-style: solid;
  display: block;
}

.side-bar > a {
  display: block;
  font-size: 14px;
  line-height: 2;
}

.side-bar > a:hover {
  cursor: pointer;
}
</style>