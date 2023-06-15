<script setup>
import { ref } from "vue";
import logo from "./Logo.vue";
import { data } from "../store";
import { auth, firestore } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

const email = ref("");
const passwordFirst = ref("");
const passwordSecond = ref("");

const db = data();

const registerEmail = async () => {
  if (passwordFirst.value !== passwordSecond.value) {
    alert("Second password does not match first!");
    return;
  }

  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.value,
    passwordFirst.value
  );
  db.user = user;
  await setDoc(doc(firestore, "cart", user.email), db.inv);
};
</script>

<template>
  <logo />
  <div class="register">
    <form @submit.prevent="registerEmail()">
      <input type="email" required placeholder="email" v-model="email" />
      <input type="password" required placeholder="password" v-model="passwordFirst" />
      <input
        type="password"
        required
        placeholder="retype password"
        v-model="passwordSecond"
      />
      <input type="submit" value="Sign up" />
      <button @click="$router.push('/Login')">Back to Login</button>
    </form>
  </div>
</template>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8%;
}

input {
  display: block;
  width: 550px;
  height: 50px;
  font-size: 25px;
  padding-left: 1%;
  box-sizing: border-box;
  border-radius: 4px;
}

input[type="submit"] {
  margin-top: 1px;
  font-family: cursive;
}

button {
  margin-top: 20px;
  width: 550px;
  height: 50px;
  font-size: 25px;
  border-radius: 4px;
  font-family: cursive;
}
</style>
