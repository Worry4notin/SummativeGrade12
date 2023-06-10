import { defineStore } from 'pinia'
import { firestore } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export const data = defineStore('store', {
  state: () => ({
    user: null,
    inv: [],
  }),
  actions: {
    async addCart(data) {
      this.inv.push({
        data,
      });

      await setDoc(doc(firestore, "cart", this.user.email), { inv: this.inv });
    }
  }
})

export const dataTemp = defineStore("data", () => {
  const list = "";
  const viewTemp = "";
  const isOpen = false;

  return { list, viewTemp, isOpen };
});