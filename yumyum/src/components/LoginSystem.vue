<script setup>
import { ref } from "vue";
import router from "../router/index";
import logo from "./Logo.vue";
import { data } from "../store";
import { auth, firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc } from "@firebase/firestore";

const email = ref("");
const passwordFirst = ref("");

const db = data();

const loginEmail = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.value,
      passwordFirst.value
    );
    db.user = user;
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

const LoginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  db.user = user;

  //const { cart } = (await getDoc(doc(firestore, "cart", user.email))).data();
  //db.cart = cart;
  router.push("/");
};


</script>

<template>
    <logo />
    <div class="login">
      <form @submit.prevent="loginEmail()">
        <input type="email" required placeholder="email" v-model="email" />
        <input type="password" required placeholder="password" v-model="passwordFirst" />
        <input type="submit" value="Login" />
      </form>
    </div>
    <div>
      <h1>Register via Google</h1>
      <button @click="LoginGoogle()">Google</button>
    </div>
      <button @click="$router.push('/Register')">Register</button>
    <button></button>
</template>