import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../../core/services/authguard.service';
import { FuseLoginComponent } from './login.component';

const routes = [
    {
        path     : 'pages/auth/login',
        component: FuseLoginComponent,
        resolve: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        FuseLoginComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class LoginModule
{

}
