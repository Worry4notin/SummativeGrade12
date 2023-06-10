<script setup>
import { ref } from "vue";
import router from "../router/index";
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
  await setDoc(doc(firestore, "cart", user.email), { inv: db.inv });
  router.push("/Login");
};

</script>

<template>
    <logo />
    <div class="register">
      <form @submit.prevent="registerEmail()">
        <input type="email" required placeholder="email" v-model="email" />
        <input type="password" required placeholder="password" v-model="passwordFirst" />
        <input type="password" required placeholder="retype password" v-model="passwordSecond" />
        <input type="submit" value="Sign up" />
      </form>
    </div>
</template>