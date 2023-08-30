import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { EasypassFeeComponent } from './easypass-fee/easypass-fee.component';


@NgModule({
    imports: [RouterModule.forChild([ 
       
        { path: 'fee', component: EasypassFeeComponent },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
