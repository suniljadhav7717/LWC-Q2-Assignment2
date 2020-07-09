import { LightningElement, wire, track, api } from "lwc";

import { updateRecord } from "lightning/uiRecordApi";
import ACCOUNT_ID from "@salesforce/schema/Account.Id";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import ACCOUNT_PHONE from "@salesforce/schema/Account.Phone";
import ACCOUNT_WEBSITE from "@salesforce/schema/Account.Website";
import ACCOUNT_ACCOUNTNUMBER from "@salesforce/schema/Account.AccountNumber";
import ACCOUNT_INDUSTRY from "@salesforce/schema/Account.Industry";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference } from "lightning/navigation";
import { registerListener, unregisterAllListeners, fireEvent } from "c/pubsub";

export default class LdsDetailComponent extends LightningElement {
  @track acc;
  @track accValue;
  @track accName;
  @track accPhone;
  @track accWebsite;
  @track accIndustry;
  @track accAccountNumber;
  @track isEdit = false;
  @track isEdit1 = true;
  inputLabel;
  inputValue;

  @wire(CurrentPageReference) pageRef;

  connectedCallback() {
    registerListener("detailClicked", this.handleEvent1, this);
  }

  handleEvent1(inpVal) {
    this.acc = inpVal;

    this.accName = this.acc.Name;
    this.accPhone = this.acc.Phone;
    this.accIndustry = this.acc.Industry;
    this.accWebsite = this.acc.Website;
    this.accAccountNumber = this.acc.AccountNumber;
  }

  handleChanges(event) {
    this.inputLabel = event.target.label;
    this.inputValue = event.target.value;
    if (
      this.inputLabel === "Account Name" &&
      this.inputValue !== null &&
      this.inputValue !== "" &&
      this.inputValue !== undefined
    )
      this.accName = event.target.value;
    if (
      this.inputLabel === "Account Phone" &&
      this.inputValue !== null &&
      this.inputValue !== "" &&
      this.inputValue !== undefined
    )
      this.accPhone = event.target.value;
    if (
      this.inputLabel === "Account Number" &&
      this.inputValue !== null &&
      this.inputValue !== "" &&
      this.inputValue !== undefined
    )
      this.accPhone = event.target.value;
    if (
      this.inputLabel === "Account Industry" &&
      this.inputValue !== null &&
      this.inputValue !== "" &&
      this.inputValue !== undefined
    )
      this.accPhone = event.target.value;
    if (
      this.inputLabel === "Account Website" &&
      this.inputValue !== null &&
      this.inputValue !== "" &&
      this.inputValue !== undefined
    )
      this.accPhone = event.target.value;
  }

  updateAccountRecord() {
    const fields = {};
    fields[ACCOUNT_ID.fieldApiName] = this.acc.Id;
    fields[ACCOUNT_NAME.fieldApiName] = this.accName;
    fields[ACCOUNT_PHONE.fieldApiName] = this.accPhone;
    fields[ACCOUNT_WEBSITE.fieldApiName] = this.accWebsite;
    fields[ACCOUNT_ACCOUNTNUMBER.fieldApiName] = this.accAccountNumber;
    fields[ACCOUNT_INDUSTRY.fieldApiName] = this.accIndustry;

    const recordInput = { fields };

    updateRecord(recordInput)
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message:
              "Account Name " +
              " " +
              this.acc.Name +
              " " +
              "has been updated successfully.",
            variant: "success"
          })
        );

        fireEvent(this.pageRef, "updateClicked", "hello");
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Updating error",
            message: error.body.message,
            variant: "error"
          })
        );
      });

    this.isEdit = false;
    this.isEdit1 = true;
  }

  cancelAccountRecord() {
    this.isEdit = false;
    this.isEdit1 = true;
  }
  editHandler() {
    this.isEdit = true;
    this.isEdit1 = false;
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }
}