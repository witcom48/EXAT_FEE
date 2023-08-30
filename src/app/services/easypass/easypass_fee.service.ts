import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';

import { InitialCurrent } from '../../config/initial_current';
import { EasypassFeeModel } from '../../models/easypass/easypass_fee';


@Injectable({
  providedIn: 'root'
})
export class EasypassFeeService {

  public config:AppConfig = new AppConfig();  
  public initial_current:InitialCurrent = new InitialCurrent();  

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  constructor(private http:HttpClient, private router: Router, private datePipe: DatePipe) { 
    //this.doGetInitialCurrent();
  }

  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (this.initial_current) {
      this.httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.initial_current.Token
      });

      this.options = {
        headers: this.httpHeaders
      };

    }   
    else{
      this.router.navigateByUrl('login');
    } 
  }

  public getToken(){      
    let request = { 
      usr:'exat',
      pwd:'mflow@',          
    };

    return this.http.post<any>(this.config.ApiGetToken + '/verify', request).toPromise()   
      .then((res) => {
        //let message = JSON.parse(res);
        //console.log(res.message)
        return res.message;
      });
  }
     
  public fee_get(token:string, status:string, tax_id:string, fromdate:Date, todate:Date){ 
    
      this.httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': "Bearer " + token
      });

      this.options = {
        headers: this.httpHeaders
      };

      let request = { 
        fromdate:this.datePipe.transform(fromdate, 'yyyy-MM-dd 00:00:00'),
        todate:this.datePipe.transform(todate, 'yyyy-MM-dd 00:00:00'),
        status:status,
        tax_id:'3129900077028',        
      };

      return this.http.post<any>(this.config.ApiEasypassFeeModule + '/fee/get', request, this.options).toPromise()   
    .then((res) => {
      //let message = JSON.parse(res);
      //console.log(res)
      return res;
    });
  }

  public fee_status(token:string, model:EasypassFeeModel){ 
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': "Bearer " + token
    });

    this.options = {
      headers: this.httpHeaders
    };

    let request = { 
      fee_doc:model.fee_doc,
      fee_status:'F',
         
    };

    return this.http.post<any>(this.config.ApiEasypassFeeModule + '/fee/status', request, this.options).toPromise()   
  .then((res) => {
    //let message = JSON.parse(res);
    //console.log(res)
    return res;
  });
}
 

}
