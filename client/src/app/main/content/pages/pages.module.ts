import { NgModule } from '@angular/core';

import { LoginModule } from './authentication/login/login.module';

@NgModule({
    imports: [
        // Auth
        LoginModule
    ]
})
export class PagesModule
{
}
