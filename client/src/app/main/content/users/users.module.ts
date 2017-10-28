import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { UsersScreenComponent } from './users.component';
import { AuthGuard } from '../../../core/services/authguard.service';

const routes = [
    {
        path     : 'users',
        component: UsersScreenComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        UsersScreenComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        UsersScreenComponent
    ]
})

export class UsersModule
{
}
