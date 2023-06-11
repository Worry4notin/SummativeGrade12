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

const db = data();

const LoginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
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
  data().user = user;
  router.push("/Store");
};

const loginEmail = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.value,
      passwordFirst.value
    );
    router.push("/Store");
    db.user = user;
  } catch (error) {
    console.log(error);
  }
}

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