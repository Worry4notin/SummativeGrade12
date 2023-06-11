import { defineStore } from 'pinia'
import { firestore, auth } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export const data = defineStore('store', () => {
    let user =  null;
    let inv = [];
  
    const addCart = async (data) => {
      inv.push(data);
      var noDup = inv;
      noDup =  [...new Set(inv)];
      console.log(noDup);
    }
  /*actions: {
    async addCart(data) {
      this.inv.push({
        data,
      });

      this.temp = [ ...new Set(this.inv.data)];
      console.log(this.temp)

      //await setDoc(doc(firestore, "cart", this.user.email), { inv: this.inv });
    }
  }*/
  return { user, inv, addCart};
});

export const dataTemp = defineStore("data", () => {
  const list = "";
  const viewTemp = "";
  const isOpen = false;

  return { list, viewTemp, isOpen };
});