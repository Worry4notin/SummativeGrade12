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
import { getDoc, doc, setDoc } from "@firebase/firestore";

const email = ref("");
const passwordFirst = ref("");

const db = data();

const LoginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  console.log(user.email)
  let cart = (await getDoc(doc(firestore, "cart", user.email)));

  if(!cart.exists())
  {
    console.log(db.inv)
    await setDoc(doc(firestore, "cart", user.email), { inv: db.inv });
    db.cart = cart.data();
  }
  else{
    db.cart = cart.data();
  }
  db.user = user;
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