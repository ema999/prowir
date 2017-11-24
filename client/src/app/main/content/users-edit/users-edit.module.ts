import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { UsersEdit } from './users-edit.component';
import { AuthGuard } from '../../../core/services/authguard.service';

const routes = [
    {
        path     : 'users/edit/:id',
        component: UsersEdit,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        UsersEdit
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        UsersEdit
    ]
})

export class UsersEditModule
{
}
