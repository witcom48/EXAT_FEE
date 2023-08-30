import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

import { Table } from 'primeng/table'; 


import { AppConfig } from '../../../config/config';


import { EtaxModel } from '../../../models/etax/etax';
import { EtaxService } from '../../../services/etax/etax.service';


import { EasypassFeeModel } from '../../../models/easypass/easypass_fee';

import { EasypassFeeService } from '../../../services/easypass/easypass_fee.service';

interface Fee {
  fee_date: Date,
  fee_doc: string,
  fee_amount: number,
  fee_status: string,
  customer_name: string,
  customer_address: string,
  customer_email: string,
  customer_type: string,
  smartcard_id: string,
  tax_id: string,    
  modified_by: string,
  modified_date: Date,
}




@Component({
  selector: 'app-easypass-fee',
  templateUrl: './easypass-fee.component.html',
  styleUrls: ['./easypass-fee.component.scss']
})
export class EasypassFeeComponent implements OnInit {

  ingredient!: string;

  @ViewChild(Table ) dt: Table | undefined ;
  
  constructor(private etaxService: EtaxService,     
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private easypassFeeService: EasypassFeeService
    ) { }
  
  loading: boolean = false;
  progress: boolean = false;

  // #region Language
  language!: string;

  title_grid_date: {[key: string]: string} = {  EN: "Doc. Date",  TH: "วันที่"}
  title_grid_doc: {[key: string]: string} = {  EN: "Doc. No.",  TH: "เลขที่อ้างอิง"}
  title_grid_fee: {[key: string]: string} = {  EN: "Fee",  TH: "ค่าธรรมเนียม"}
  title_grid_status: {[key: string]: string} = {  EN: "Status",  TH: "สถานะ"}
  title_grid_name: {[key: string]: string} = {  EN: "Customer",  TH: "ชื่อ-นามสกุล"}
  title_grid_obu: {[key: string]: string} = {  EN: "OBU",  TH: "OBU"}
  title_grid_smartcard: {[key: string]: string} = {  EN: "Smartcard id",  TH: "Smartcard id"}
  title_grid_tax: {[key: string]: string} = {  EN: "Tax",  TH: "รหัสผู้เสียภาษี"}
  
  title_modified_by: {[key: string]: string} = {  EN: "Edit by",  TH: "ผู้ทำรายการ"}
  title_modified_date: {[key: string]: string} = {  EN: "Modify date",  TH: "ปรับปรุงเมื่อ"}

  title_new: {[key: string]: string} = {  EN: "New",  TH: "เพิ่ม"}
  title_edit: {[key: string]: string} = {  EN: "Edit",  TH: "แก้ไข"}
  title_save: {[key: string]: string} = {  EN: "Save",  TH: "บันทึก"}
  title_close: {[key: string]: string} = {  EN: "Close",  TH: "ปิด"}
  title_cancel: {[key: string]: string} = {  EN: "Cancel",  TH: "ยกเลิก"}
  title_more: {[key: string]: string} = {  EN: "More",  TH: "เพิ่มเติม"}
  title_search: {[key: string]: string} = {  EN: "Search",  TH: "ค้นหา"}
  title_upload: {[key: string]: string} = {  EN: "Upload",  TH: "อัพโหลด"}

  title_confirm: {[key: string]: string} = {  EN: "Are you sure?",  TH: "ยืนยันการทำรายการ"}
  title_confirm_record: {[key: string]: string} = {  EN: "Confirm to record",  TH: "คุณต้องการบันทึกการทำรายการ"}
  title_confirm_delete: {[key: string]: string} = {  EN: "Confirm to delete",  TH: "คุณต้องการลบรายการ"}
  title_confirm_yes: {[key: string]: string} = {  EN: "Yes",  TH: "ใช่"}
  title_confirm_no: {[key: string]: string} = {  EN: "No",  TH: "ยกเลิก"}
  title_confirm_cancel: {[key: string]: string} = {  EN: "You have cancelled",  TH: "คุณยกเลิกการทำรายการ"}

  title_page: {[key: string]: string} = {  EN: "Request a tax invoice for card account maintenance Easy Pass",  TH: "ขอใบกำกับภาษีค่ารักษาบัญชีบัตร Easy Pass"}
  title_search_condition: {[key: string]: string} = {  EN: "Search conditions",  TH: "เงื่อนไขการค้นหา"}

  title_status: {[key: string]: string} = {  EN: "Status",  TH: "สถานะเอกสาร"}
  title_status_all: {[key: string]: string} = {  EN: "All",  TH: "ทั้งหมด"}
  title_status_wait: {[key: string]: string} = {  EN: "wait",  TH: "ขอใบกำกับภาษี"}
  title_status_success: {[key: string]: string} = {  EN: "complete",  TH: "เรียบร้อยแล้ว"}
  title_status_fail: {[key: string]: string} = {  EN: "incomplete",  TH: "รายการไม่สมบูรณ์"}
  
  title_date: {[key: string]: string} = {  EN: "Date",  TH: "วันที่เอกสาร"}
  title_date_from: {[key: string]: string} = {  EN: "From",  TH: "จากวันที่"}
  title_date_to: {[key: string]: string} = {  EN: "To",  TH: "ถึงวันที่"}

  title_page_from: {[key: string]: string} = {  EN: "Showing",  TH: "แสดง"}
  title_page_to: {[key: string]: string} = {  EN: "to",  TH: "ถึง"}
  title_page_total: {[key: string]: string} = {  EN: "of",  TH: "จาก"}
  title_page_record: {[key: string]: string} = {  EN: "entries",  TH: "รายการ"}

  title_customer: {[key: string]: string} = {  EN: "Customer detail",  TH: "ข้อมูลผู้ใช้บริการ"}
  title_customer_name: {[key: string]: string} = {  EN: "Customer name",  TH: "ชื่อ - นามสกุล"}
  title_customer_id: {[key: string]: string} = {  EN: "Customer id.",  TH: "รหัสลูกค้า"}
  title_customer_tax: {[key: string]: string} = {  EN: "Tax id.",  TH: "รหัสผู้เสียภาษี"}
  title_customer_address: {[key: string]: string} = {  EN: "Address",  TH: "ที่อยู่"}
  title_customer_email: {[key: string]: string} = {  EN: "Email",  TH: "อีเมล์"}
  title_customer_type: {[key: string]: string} = {  EN: "Cust. type",  TH: "ประเภท"}

  title_customer_prefix: {[key: string]: string} = {  EN: "Prefix",  TH: "คำนำหน้า"}
  title_customer_firstname: {[key: string]: string} = {  EN: "Firstname",  TH: "ชื่อ"}
  title_customer_lastname: {[key: string]: string} = {  EN: "Lastname",  TH: "นามสกุล"}

  title_fee: {[key: string]: string} = {  EN: "Maintenance fee",  TH: "ค่ารักษาบัญชีบัตร Easy Pass"}
  title_fee_doc: {[key: string]: string} = {  EN: "Ref.",  TH: "เลขที่อ้างอิง"}
  title_fee_date: {[key: string]: string} = {  EN: "Date",  TH: "วันที่ตัดเงิน"}
  title_smartcard_id: {[key: string]: string} = {  EN: "Smartcard id",  TH: "Smartcard id"}
  title_fee_amount: {[key: string]: string} = {  EN: "Amount",  TH: "จำนวนเงิน"}
  title_fee_status: {[key: string]: string} = {  EN: "Status",  TH: "สถานะ"}

  title_send_etax: {[key: string]: string} = {  EN: "Tax invoice",  TH: "ขอใบกำกับภาษี"}
  // #endregion

  public config:AppConfig = new AppConfig();
  
  fill_status: string = "W"
  fill_fromdate: Date = new Date()
  fill_todate: Date = new Date()

  
  ngOnInit(): void {
    this.language = "TH"

    this.doGetData()
  }

  displayManage: boolean = false;
  position: string = "right";
  doShowDetail(doc:string){
    this.displayManage = true
  }

  doCloseDetail(){
    this.displayManage = false
  }

  async doGenarateEtax(){

    this.progress = true

    var dateNow = new Date()
    var etax : EtaxModel = new EtaxModel()

    etax.CustomerCode = this.seletedFee.cust_acct_id
    etax.CustomerName = (this.seletedFee.title || "") + this.seletedFee.fname + ' ' + (this.seletedFee.lname || "")
    etax.CustomerCode = this.seletedFee.cust_acct_id    
    etax.CustomerTaxID = this.seletedFee.tax_id
    if(etax.CustomerTaxID.length > 13){
      etax.CustomerTaxID = etax.CustomerTaxID.substring(0, 13)
    }

    if(this.seletedFee.cust_type == "P"){
      etax.schemeID = "NIDN"
    }
    else if(this.seletedFee.cust_type == "C"){
      etax.schemeID = "TXID"
      etax.CustomerBranchCode = this.seletedFee.branch_id
    }
    else{
      etax.schemeID = "OTHR"
    }
        
    etax.CustomerAddressLine1 = this.seletedFee.address.substring(0, this.seletedFee.address.length - 5)
    etax.CustomerPostcode = this.seletedFee.address.substring(this.seletedFee.address.length - 5, this.seletedFee.address.length)
    etax.DocAmount = this.seletedFee.fee_amount.toFixed(2)
    etax.DocDiscount = "0.00"
    etax.DocAfterDiscount = etax.DocAmount
    etax.DocTax = "0.00"
    etax.DocNet = etax.DocAmount
    etax.FIDoc = this.seletedFee.fee_doc
    etax.PostBy = "TEST"
    etax.ReferenceNumber = "TEST"
    etax.issueDateTime = this.datePipe.transform(this.seletedFee.fee_date, 'yyyy-MM-dd') + "T00:00:00"
    etax.FiscalYear = this.datePipe.transform(this.seletedFee.fee_date, 'yyyy') + ""
    etax.PostingDate = this.datePipe.transform(dateNow, 'yyyy-MM-dd') + "T00:00:00"
    etax.ReferenceNumber = "FEE" + this.datePipe.transform(this.seletedFee.fee_date, 'yyMMdd')
    etax.ETax_detail = this.config.ETaxDetail;
    etax.ETax_amount = this.seletedFee.fee_amount.toFixed(2)
    etax.ETax_tax = "0.00"
    etax.ETax_doc = this.seletedFee.fee_doc

    try{
      this.etaxService.genarate_etax(etax).then((res) => {       
      
        console.log(res.responseCode)
        
        
        if(res.responseCode == "S"){
          this.messageService.add({severity:'success', summary: 'ทำรายการสำเร็จ', detail: res.message});
          //this.doLoadProject()
  
          //-- Update status
          this.easypassFeeService.getToken().then(async (res) => {      
        
            setTimeout(async () => {
  
              await this.easypassFeeService.fee_status(res, this.seletedFee).then(async (res) => { 
                //console.log(res)
  
                if(res.success === true){   
                  this.doGetData()
                  this.doCloseDetail()
  
                  this.progress = false
                }
                else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: "พบข้อผิดผลาดในการทำรายการ โปรดติดต่อเจ้าหน้าที่่"});
                  this.progress = false
                }
  
              }); 
                          
            }, 300);
                  
          });  
  
  
        }
        else{
          this.messageService.add({severity:'error', summary: 'Error', detail: "พบข้อผิดผลาดในการทำรายการ โปรดติดต่อเจ้าหน้าที่่"});
          this.progress = false
        }  
  
  
      });
    }
    catch{
      this.messageService.add({severity:'error', summary: 'Error', detail: "พบข้อผิดผลาดในการทำรายการ โปรดติดต่อเจ้าหน้าที่่"});
      this.progress = false
    }

    


  }
  
  fromdate:Date = new Date()
  todate:Date = new Date()

  tmp:string = ""

  async doGetData() {
    
    await this.easypassFeeService.getToken().then(async (res) => {      
      
      setTimeout(() => {
        this.doGetFeeList(res) 
        
      }, 300);
            
    });   
    
   

  }  

  reloadFee(){
    this.doGetData()
  }


  fee_list: EasypassFeeModel[] = [];
  seletedFee:EasypassFeeModel = new EasypassFeeModel()
  async doGetFeeList(token:string) {

    this.loading = true

    await this.easypassFeeService.fee_get(token, this.fill_status, "", this.fill_fromdate, this.fill_todate).then(async (res) => {       

      if(res.success === true){                    
        this.fee_list = res.data   
        
        this.loading = false
      }

    });
  }  

  doShowFeeDetail(doc:string){

    this.progress = false

    for (let i = 0; i < this.fee_list.length; i++) {   
      if(this.fee_list[i].fee_doc==doc ){
        this.seletedFee = this.fee_list[i];
        this.displayManage = true
        break;         
      }                      
    }

  }

  onRowSelectFee(event: Event) {
    this.progress = false
  }

  




}
