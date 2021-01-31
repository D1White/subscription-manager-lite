import { makeAutoObservable, toJS } from "mobx";
import subsc from "../assets/subscriptions.json";

class Store {
  subscriptions = [...subsc];
  subscPrice = 0;

  constructor() {
    makeAutoObservable(this);
    this.priceTotal();
  }

  addSubscr(subscr) {
    this.subscriptions.unshift(subscr);
    this.priceTotal();
  }

  removeSubscr(index) {
    this.subscriptions.slice(index + 1);
    this.priceTotal();
  }

  priceTotal() {
    let total = 0;

    this.subscriptions.forEach( obj => {
      total += obj.price;
    })

    console.log(total);
    console.log(toJS(this.subscriptions));

    this.subscPrice = total;
  }
}

export default new Store();
