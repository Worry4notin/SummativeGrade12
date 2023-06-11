<script setup></script>

<template>
  <div>
    <h1>Store</h1>
    <img src="../../img/Cart.png" @click="$router.push('/Cart')" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1%;
  background-color: #212121;
}

h1 {
  color: white;
  margin-left: 4%;
  font-family: cursive;
}

img {
  height: 4%;
  width: 4%;
  margin-right: 4%;
}
</style>
