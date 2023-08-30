import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { InitialCurrent } from '../config/initial_current';
import { AppConfig } from '../config/config';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    constructor(
        public layoutService: LayoutService,
        private router: Router,
    ) { }
    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
        if (!this.initial_current.Token) {
            this.router.navigateByUrl('login');
        }
    }
    ngOnInit() {
        this.doGetInitialCurrent();
        if (this.initial_current.Usertype == "ADM") {
            this.model = [                
                {
                    label: 'ลูกค้า',
                    items: [                       
                        { label: 'ค่ารักษาบัญชี', routerLink: ['/customer/fee'] },
                        { label: 'E-Tax', routerLink: ['/admin/etax'] },
                        
                    ]
                },
                {
                    label: 'เจ้าหน้าที่',
                    items: [                        
                        { label: 'ค่ารักษาบัญชี', routerLink: ['/admin/fee'] },                        
                        { label: 'ใบกำกับภาษีอย่างย่อ', routerLink: ['/admin/etax'] },
                        { label: 'ประวัติการทำรายการ', routerLink: ['/admin/etax'] },
                        
                    ]
                },
                {
                    label: 'ความปลอดภัย',
                    items: [                      
                        { label: 'Log', routerLink: ['/admin/fee'] },                        
                        { label: 'ออกจากระบบ', routerLink: ['/admin/etax'] },
                                                
                    ]
                }
                


            ];
        }
        if (this.initial_current.Usertype == "APR") {
            this.model = [
                {
                    label: 'Self Services',
                    items: [
                        //{ label: 'Policy', routerLink: ['/self/policy'] },
                        // { label: 'Employee', routerLink: ['/self/employee'] },
                        { label: 'Manager', routerLink: ['/self/approve'] },
                        { label: 'Reports', routerLink: ['/self/reports'] },
                    ]
                }
            ];
        }
        if (this.initial_current.Usertype == "Emp" ||this.initial_current.Usertype == "GRP" ) {
            this.model = [
                {
                    label: 'Self Services',
                    items: [
                        //{ label: 'Policy', routerLink: ['/self/policy'] },
                        { label: 'Employee', routerLink: ['/self/employee'] },
                        // { label: 'Manager', routerLink: ['/self/approve'] },
                        // { label: 'Reports', routerLink: ['/self/reports'] },
                    ]
                }
            ];
        }
    }
}
