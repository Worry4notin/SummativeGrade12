import { defineStore } from 'pinia'
import { firestore } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import axios from "axios";

export const data = defineStore('store', {
  state: () => ({
    user: null,
    inv: {},
  }),
  actions: {
    async addCart(data) {
      this.inv[data.title] = data;
      console.log(this.inv)
      await setDoc(doc(firestore, "cart", this.user.email), this.inv);
    },

    async removeCart(data) {
      console.log(this.inv[data.title]);
      if (this.inv[data.title]) {
        delete this.inv[data.title];
        await setDoc(doc(firestore, "cart", this.user.email), this.inv);
    }
  }
}
});

export const dataTemp = defineStore("data", () => {
  const list = "";
  const viewTemp = "";
  const isOpen = false;
  return { list, viewTemp, isOpen };
});