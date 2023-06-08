import { defineStore } from 'pinia'
import { firestore } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export const data = defineStore('store', {
  state: () => ({
    user: null,
    inv: [],
  }),
  actions: {
    async addCart(poster, title) {
      this.inv.push({
        poster,
        title,
      });

      await setDoc(doc(firestore, "cart", this.user.email), { inv: this.inv });
    }
  }
})