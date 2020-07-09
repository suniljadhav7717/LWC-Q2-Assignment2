import { LightningElement, track, wire } from "lwc";

import Type_FIELD from "@salesforce/schema/Account.Type";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { getPicklistValues } from "lightning/uiObjectInfoApi";

export default class PickListSearch extends LightningElement {
  @track value;
  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT }) objectInfo;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: Type_FIELD
  })
  TypePicklistValues;

  handleChange(event) {
    this.value = event.detail.value;
  }

  handleSearch() {
    this.dispatchEvent(new CustomEvent("selected", { detail: this.value }));
  }
}