import { LightningElement, api, track, wire } from "lwc";
import getAccountByType from "@salesforce/apex/AccountGetInfo.getAccountByType";
import { refreshApex } from "@salesforce/apex";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class SearchResults extends LightningElement {
  @api searchValue;

  @wire(getAccountByType, { typev: "$searchValue" }) accountList;
  @wire(CurrentPageReference) pageRef;

  connectedCallback() {
    registerListener("updateClicked", this.refreshAccounts, this);
  }

  refreshAccounts(accRecord) {
    refreshApex(this.accountList);
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }
}