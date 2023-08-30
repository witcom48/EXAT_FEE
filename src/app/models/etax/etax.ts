export class EtaxModel {
    constructor() {
     
    }

    ETax_doc: string = "";
    ETax_detail: string = "";
    ETax_amount: string = "";
    ETax_tax: string = "";


    issueDateTime: string = "";
    PostingDate: string = "";
    CustomerName: string = "";
    CustomerCode: string = "";
    CustomerAddressLine1: string = "";
    CustomerAddressLine2: string = "";
    CustomerPostcode: string = "";
    CustomerTaxID: string = "";

    DocAmount: string = "0.00";
    DocDiscount: string = "0.00";
    DocAfterDiscount: string = "0.00";
    DocTax: string = "0.00";
    DocNet: string = "0.00";
    FIDoc: string = "";

    PostBy: string = "";
    ReferenceNumber: string = "";
    CarRegisteration: string = "";
    schemeID: string = "";
    CustomerBranchCode: string = "";

    ReplaceissuerAssignedID: string = "";
    ReplaceissueDateTime: string = "";
    ReplacereferenceTypeCode: string = "";
    purpose: string = "";
    purposeCode: string = "";

    FiscalYear: string = "";
    FiscalRef: string = "";
    
    modified_by: string = "";
    modified_date: Date = new Date();
   
  }
