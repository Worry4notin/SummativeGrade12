<script setup>
import { auth } from "../firebase";
import router from "../router";
import { data } from "../store/index";
import { ref } from "vue";

const isOpen = ref(false);
const db = data();
const tempData = ref("");

function order(data) {
  isOpen.value = true;
  tempData.value = data;
}

function closeOrder(data) {
  isOpen.value = false;
  db.removeCart(data);
}

if (!auth.currentUser) {
  router.push("/Login");
}
</script>

<template>
  <div class="page">
    <div class="header">
      <h1>Cart</h1>
    </div>
    <div class="content">
      <div v-for="data in data().inv" class="product">
        <div>
          <img
            :src="`https://image.tmdb.org/t/p/w500/${data.poster_path}`"
            class="poster"
          />
          <div class="button">
            <button @click="db.removeCart(data)">Cancel</button>
            <button @click="order(data)">Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <div class="modal" v-if="isOpen">
      <div class="contentModal">
        <h1>Order has been placed</h1>
        <button @click="closeOrder(tempData)">Close</button>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.page {
  background-color: #292929;
  height: 100vh;
}

.header {
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

.content {
  background-color: #292929;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(10, auto);
  width: 98%;
  gap: 15px;
  padding: 15px;
}

.poster {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.button {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

button {
  font-size: 15px;
  font-family: cursive;
  border-radius: 6px;
  padding: 3px 8px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contentModal {
  background-color: #696969;
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  padding-bottom: 15px;
  align-items: center;
  justify-content: center;
}

.contentModal > button {
  font-size: 20px;
  padding: 3px 12px;
  margin-right: 25px;
}
</style>
