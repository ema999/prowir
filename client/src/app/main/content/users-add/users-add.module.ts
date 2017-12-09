import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { UsersAdd } from './users-add.component';
import { AuthGuard } from '../../../core/services/authguard.service';

const routes = [
    {
        path     : 'users/add',
        component: UsersAdd,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        UsersAdd
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        UsersAdd
    ]
})

export class UsersAddModule
{
}
