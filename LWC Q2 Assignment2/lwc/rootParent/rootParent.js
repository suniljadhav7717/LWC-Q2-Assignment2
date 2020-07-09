import { LightningElement, track } from "lwc";

export default class RootParent extends LightningElement {
  @track searchVal;

  handlerAcc(event) {
    this.searchVal = event.detail;
  }
}