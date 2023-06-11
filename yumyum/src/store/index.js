import { defineStore } from 'pinia'
import { firestore, auth } from '../firebase';
import { setDoc, getDoc ,doc } from 'firebase/firestore';

export const data = defineStore('store', () => {
    let inv = [];
  
    const addCart = async (data) => {
      //inv = await getDoc(doc(firestore, "cart", auth.currentUser.email))
      console.log(inv)
      inv.push(data);
      var noDup = inv;
      console.log(noDup)
      noDup =  [...new Set(inv)];
      console.log(noDup);
      console.log(auth.currentUser)
      console.log(inv)
      //await setDoc(doc(firestore, "cart", auth.currentUser.email), { inv: noDup });
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
  return { inv, addCart};
});




export const dataTemp = defineStore("data", () => {
  const list = "";
  const viewTemp = "";
  const isOpen = false;

  return { list, viewTemp, isOpen };
});