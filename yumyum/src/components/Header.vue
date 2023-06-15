<script setup>
import logo from "./Logo.vue";
</script>

<template>
  <div>
    <logo />
    <button @click="$router.push('/Login')">Login</button>
  </div>
</template>

<style scoped>
div {
  background: #212121;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2%;
  padding-right: 3%;
}

button {
  font-size: 25px;
  font-family: cursive;
  border-radius: 8px;
  padding: 6.5px 15px;
}
</style>
