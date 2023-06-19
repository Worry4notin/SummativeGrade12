<script setup>
import { ref } from "vue";
import router from "../router/index";
import logo from "./Logo.vue";
import { data } from "../store";
import { auth, firestore } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "@firebase/firestore";

const email = ref("");
const passwordFirst = ref("");
const passWrong = ref(false);

const db = data();

const LoginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  let cart = await getDoc(doc(firestore, "cart", user.email));

  if (!cart.exists()) {
    await setDoc(doc(firestore, "cart", user.email), db.inv);
  } else {
    db.inv = cart.data();
    console.log(data().inv);
  }
  db.user = user;
  router.push("/Store");
};

const loginEmail = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.value,
      passwordFirst.value
    );
    db.user = user;
    let cart = await getDoc(doc(firestore, "cart", user.email));
    db.inv = cart.data();
    router.push("/Store");
  } catch (error) {
    passWrong.value = true;
    console.log(error);
  }
};
</script>

<template>
  <logo />
  <div class="System">
    <form @submit.prevent="loginEmail()">
      <input type="email" required placeholder="email" v-model="email" />
      <input
        type="password"
        required
        placeholder="password"
        v-model="passwordFirst"
      />
      <input type="submit" value="Login" />
    </form>
    <p v-if="passWrong">Incorrect Login Info</p>
    <button @click="LoginGoogle()">Login via Google</button>
    <button @click="$router.push('/Register')">Register</button>
  </div>
</template>

<style scoped>
.System {
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

form {
  margin-bottom: 5px;
}

button {
  margin-top: 5px;
  width: 550px;
  height: 50px;
  font-size: 25px;
  border-radius: 4px;
  font-family: cursive;
}

p {
  color: red;
}
</style>
