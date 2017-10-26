import { NgModule } from '@angular/core';

import { LoginModule } from './authentication/login/login.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
    imports: [
        // Auth
        LoginModule,
        ProfileModule
    ]
})
export class PagesModule
{
}
