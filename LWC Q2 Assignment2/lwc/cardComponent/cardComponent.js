import { LightningElement, api, wire, track } from "lwc";

import { CurrentPageReference } from "lightning/navigation";
import { fireEvent } from "c/pubsub";

export default class CardComponent extends LightningElement {
  @api account;

  @wire(CurrentPageReference) pageRef;

  handleDetail(event) {
    fireEvent(this.pageRef, "detailClicked", this.account);
  }
}