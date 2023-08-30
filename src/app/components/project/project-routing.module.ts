import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { CostSetupComponent } from './policy/cost-setup/cost-setup.component';
import { ProGenaralComponent } from './policy/pro-genaral/pro-genaral.component';

@NgModule({
    imports: [RouterModule.forChild([ 
       
        { path: 'list', component: ProjectListComponent },       
        { path: 'setup_cost', component: CostSetupComponent },
        { path: 'pro_genaral', component: ProGenaralComponent },
        { path: 'procost', component: ProGenaralComponent },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }
