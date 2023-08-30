import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

import { VerifyComponent } from './components/authen/verify/verify.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    // { path: '', component: VerifyComponent },
                    // { path: 'project', loadChildren: () => import('./components/project/project.module').then(m => m.ProjectModule) },
                    
                    { path: 'customer', loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule) },
                    
                    { path: 'sec', loadChildren: () => import('./components/authen/authen.module').then(m => m.AuthenModule) }

                ]
            },
            { path: 'login', component: VerifyComponent, },
            // { path: 'notfound', component: NotfoundComponent },



            // { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
